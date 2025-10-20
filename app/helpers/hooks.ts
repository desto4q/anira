import { atom, getDefaultStore, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { atomWithStorage } from "jotai/utils";
import Cookies from "js-cookie"; // 👈 install with: npm i js-cookie
import { pb } from "@/api/pocketbase";
import { BaseAuthStore, type RecordModel } from "pocketbase";
import * as lod from "lodash";
export const usePagination = (totalPages?: number) => {
  const [internalTotalPages, setInternalTotal] = useState(totalPages || 10);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!totalPages) {
      return;
    }
    if (internalTotalPages !== totalPages) {
      setInternalTotal(totalPages);
    }
  }, [totalPages]);
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev.toString());
        params.set("page", page.toString());
        return params;
      },
      {
        preventScrollReset: true,
      },
    );
  };

  return {
    currentPage,
    totalPages,
    handlePageChange,
  };
};

const cookieStorage = {
  getItem: (key: string) => {
    const value = Cookies.get(key);
    return value ?? null;
  },
  setItem: (key: string, value: string) => {
    Cookies.set(key, value, { expires: 365 }); // expires in 1 year
  },
  removeItem: (key: string) => {
    Cookies.remove(key);
  },
};
export const themes = {
  dark: ["reef", "forest", "synthwave", "halloween", "dim", "coffee"] as const,
  light: ["cupcake", "nord", "wireframe", "emerald", "corporate"] as const,
} as const;
type ThemeMode = keyof typeof themes; // "dark" | "light"
type ThemeValue = (typeof themes)[ThemeMode][number];

const theme_atom = atomWithStorage<ThemeValue>("theme", "reef", cookieStorage);
export const useTheme = () => {
  let [theme, setTheme] = useAtom(theme_atom);
  return [theme, setTheme] as const;
};

export const useModal = () => {
  let ref = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    if (ref.current) {
      ref.current.showModal();
    }
  };
  const closeModal = () => {
    if (ref.current) {
      ref.current.close();
    }
  };
  const modalOptions = {
    openModal,
    closeModal,
    ref,
  };
  return [ref, modalOptions] as const;
};
interface UserModel extends RecordModel {
  username: string;
  email: string;
}

export const user_atom = atomWithStorage<UserModel | null>("auth", null);

export const useUser = () => {
  const [user, setUser] = useAtom<UserModel | null>(user_atom);

  return [user, setUser] as const;
};
const user_Store = getDefaultStore();
user_Store.get(user_atom);
pb.authStore.onChange(() => {
  const currentUser = user_Store.get(user_atom); // get current value
  if (pb.authStore.isValid) {
    if (!lod.isEqual(currentUser, pb.authStore.record)) {
      user_Store.set(user_atom, pb.authStore.record as UserModel);
    }
  } else {
    if (currentUser !== null) {
      user_Store.set(user_atom, null);
    }
  }
});
