import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../types/user.type";
import { UserService } from "../services/user.service";

export const useAuthUser = () => {
  return useMutation({
    mutationFn: (params: LoginData) => UserService.validateUser(params),
  });
};
