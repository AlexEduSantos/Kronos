"use client";

import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Skeleton } from "@/_components/ui/skeleton";
import { useUser } from "@/_viewmodels/useUser";
import { ImagePlus, User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProfileDetails = () => {
  const {
    user,
    isLoading,
    userForm,
    isEditing,
    setIsEditing,
    avatar,
    submitUser,
    fileToUpload,
    setFileToUpload,
  } = useUser();

  if (isLoading)
    return (
      <>
        <Skeleton className="w-full min-h-[115px] bg-white p-4 flex justify-between items-center rounded-none" />
      </>
    );

  return (
    <Form {...userForm}>
      <form
        className=" flex flex-col gap-4 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("início da chamada");
          submitUser(userForm.getValues());
        }}
      >
        <FormField
          control={userForm.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="w-full aspect-auto">
              <FormControl>
                <div className="relative flex items-center justify-center">
                  <Label
                    htmlFor="avatar-upload"
                    className={`relative w-1/2 aspect-square rounded-full overflow-hidden shadow group ${
                      isEditing ? "hover:ring-2 hover:ring-primary/50" : ""
                    }`}
                  >
                    {field.value ? (
                      <Image
                        src={field.value}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User2 className="w-full h-full p-6 stroke-1 text-gray-400 bg-muted" />
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImagePlus className="text-white w-6 h-6" />
                      </div>
                    )}
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    disabled={!isEditing}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      setFileToUpload(file);

                      const previewUrl = URL.createObjectURL(file);
                      field.onChange(previewUrl);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={userForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome do usuário</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={userForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail do usuário</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full">
          {isEditing && (
            <Button
              type="submit"
              disabled={userForm.formState.isSubmitting || isLoading}
            >
              {userForm.formState.isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileDetails;
