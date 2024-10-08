import {
  useMutation
} from "@tanstack/react-query";
import { CreateInventoryData } from "../types/inventory.type";
import { InventoryService } from "../services/inventory.service";

export const useCreateInventory = () => {
  return useMutation({
    mutationFn: (params: CreateInventoryData) =>
      InventoryService.createInventory(params),
  });
};
