import {
    useMutation
  } from "@tanstack/react-query";
  import { UpdateInventory } from "../types/inventory.type";
  import { InventoryService } from "../services/inventory.service";
  
  export const useUpdateInventory = () => {
    return useMutation({
      mutationFn: (params: UpdateInventory) =>
        InventoryService.updateStatus(params),
    });
  };
  