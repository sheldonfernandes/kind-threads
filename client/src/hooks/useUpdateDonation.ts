import {
    useMutation
  } from "@tanstack/react-query";
  import { UpdateDonation } from "../types/inventory.type";
  import { InventoryService } from "../services/inventory.service";
  
  export const useUpdateDonation = () => {
    return useMutation({
      mutationFn: (params: UpdateDonation) =>
        InventoryService.updateDonation(params),
    });
  };
  