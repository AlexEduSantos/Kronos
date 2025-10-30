"use client";

import { userSchema } from "@/_schemas/userSchema";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "@/_services/user-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { set } from "zod";

type UserForm = {
  name: string;
  email: string;
  avatar?: string | undefined;
};

export const useUser = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(),
  });

  const queryClient = useQueryClient();

  const updateUser = useMutation({
    mutationFn: (payload: any) => updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Perfil atualizado com sucesso!");
    },
  });

  const avatar = () => {
    if (user?.avatar) {
      return (
        <img
          src={user?.avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      );
    } else {
      return (
        <img
          src="/profile.jpg"
          alt="avatar"
          className="w-full h-full object-cover"
        />
      );
    }
  };

  const userForm = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    },
  });

  const submitUser = async (data: UserForm) => {
    updateUser.mutate({ ...data, avatar: fileToUpload });
  };

  return {
    user,
    isLoading,
    updateUser,
    userForm,
    isEditing,
    setIsEditing,
    avatar,
    submitUser,
    fileToUpload,
    setFileToUpload,
  };
};
