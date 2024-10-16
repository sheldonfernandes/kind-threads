import { useUpdateDonation } from "@/src/hooks/useUpdateDonation";
import { useAuthStore } from "@/src/store/Auth.store";
import {
  AIresponse,
  DonationStatusEnum,
  InventoryData,
} from "@/src/types/inventory.type";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRecycle } from "react-icons/fa"; // Import the recycle icon from react-icons
import AppLoader from "../AppLoader";
import { EndpointConst } from "@/src/constants/endpoints.constant";
import { useRouter } from "next/navigation";
interface DonationDetailsConfirmationProps {
  initialData: InventoryData;
}

const DonationDetailsConfirmation: React.FC<
  DonationDetailsConfirmationProps
> = ({ initialData }) => {
  const { userData } = useAuthStore();
  const router = useRouter();
  const [formData, setFormData] = useState<AIresponse>(initialData.ai_response);
  const [showDonationCenters, setShowDonationCenters] = useState(false);
  const [donationType, setDonationType] = useState<string>("");
  const [donationCenterSelected, setDonationCenterSelected] =
    useState<string>("");

  const {
    mutate,
    isPending,
    isSuccess: isUpdateDonationSuccess,
  } = useUpdateDonation();

  useEffect(() => {
    if (isUpdateDonationSuccess) {
      router.push(EndpointConst.MARKETPLACE_PAGE);
    }
  }, [isUpdateDonationSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (donationType === "dropoff_donation") {
      mutate({
        inventory_id: initialData.inventory_id,
        donation_status: DonationStatusEnum.PICKED_UP,
        donation_center_selected: donationCenterSelected,
        collector_id: userData?.user_id,
        collector_name: userData?.user_name,
      });
    } else {
      mutate({
        inventory_id: initialData.inventory_id,
        donation_status:
          donationType === "pickup_donation"
            ? DonationStatusEnum.PENDING
            : DonationStatusEnum.SELF_CLAIM,
        donation_center_selected: donationCenterSelected,
      });
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Show donation centers when dropoff or pickup is selected
    if (name == "donation_type") {
      setDonationType(value);
      if (value === "dropoff_donation" || value === "pickup_donation") {
        setShowDonationCenters(true);
      } else {
        setShowDonationCenters(false);
        setDonationCenterSelected("");
      }
    } else {
      setDonationCenterSelected(value);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formShortDesc">
        <Form.Label>
          <strong>Short Description:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="short_desc"
          value={formData.short_desc}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>
          <strong>Type:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formBrand">
        <Form.Label>
          <strong>Brand:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formSize">
        <Form.Label>
          <strong>Size:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formCondition">
        <Form.Label>
          <strong>Condition:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formMaterial">
        <Form.Label>
          <strong>Material:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          name="material"
          value={formData.material}
          onChange={handleInputChange}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formRecommendation">
        <Form.Label>
          <strong>Recommendation:</strong>
        </Form.Label>
        <div className="bg-info p-2 mt-1">
          <FaRecycle className="me-1" /> {/* Recycle icon */}
          <span>{formData.recommendation}</span>
        </div>
      </Form.Group>

      <Form.Label>
        <strong>Donation Method:</strong>
      </Form.Label>
      <Form.Check
        type="radio"
        label="Drop off at donation center"
        name="donation_type"
        value="dropoff_donation"
        checked={formData.donation_type === "dropoff_donation"}
        onChange={handleRadioChange}
      />
      <Form.Check
        type="radio"
        label="Request pickup for donation center"
        name="donation_type"
        value="pickup_donation"
        checked={formData.donation_type === "pickup_donation"}
        onChange={handleRadioChange}
      />
      <Form.Check
        type="radio"
        label="List on marketplace so anyone can reuse"
        name="donation_type"
        value="open_donation"
        checked={formData.donation_type === "open_donation"}
        onChange={handleRadioChange}
      />

      {showDonationCenters && (
        <div>
          <Form.Label>
            <strong>Donation Center:</strong>
          </Form.Label>
          {formData.donation_centers.map((center, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={center}
              name="donation_center"
              value={center}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      )}

      <div className="text-end mt-3">
        {" "}
        {/* Align button to the right */}
        <Button variant="primary" type="submit">
          Complete
        </Button>
      </div>
      {isPending && <AppLoader />}
    </Form>
  );
};

export default DonationDetailsConfirmation;
