import { useCreateInventory } from "@/src/hooks/useCreateInventory";
import { useAuthStore } from "@/src/store/Auth.store";
import { InventoryData } from "@/src/types/inventory.type";
import React, { useState, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { FaRecycle } from "react-icons/fa"; // Import the recycle icon from react-icons

interface DonationDetails {
  short_desc: string;
  type: string;
  brand: string;
  size: string;
  condition: string;
  material: string;
  recommendation: string;
  donation_centers: string[];
  donation_center?: string; // Optional, for radio button selection
  donation_type?: string; // Optional, for donation method
}

interface DonationDetailsConfirmationProps {
  initialData: InventoryData;
}

const DonationDetailsConfirmation: React.FC<DonationDetailsConfirmationProps> = ({
  initialData,
}) => {
  const { userData } = useAuthStore();
  const [formData, setFormData] = useState<DonationDetails>(JSON.parse(initialData.ai_response));
  const [showDonationCenters, setShowDonationCenters] = useState(false);
  const { mutate, data: inventoryData, isPending, isError } = useCreateInventory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("Form submitted with data:", formData);
    // initialData.ai_response = formData;

    // mutate({
    //   user_id: userData?.user_id || "",
    //   user_name: userData?.user_name || "",
    //   material_image: imageSource,
    //   pick_up_address: pickUpAddress,
    // });

    // Add your form submission logic here (e.g., API call)
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Show donation centers when dropoff or pickup is selected
    if (name  == "donation_type") {
      if (value === "dropoff_donation" || value === "pickup_donation") {
        setShowDonationCenters(true);
      } else {
        setShowDonationCenters(false);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formShortDesc">
        <Form.Label><strong>Short Description:</strong></Form.Label>
        <Form.Control
          type="text"
          name="short_desc"
          value={formData.short_desc}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label><strong>Type:</strong></Form.Label>
        <Form.Control
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formBrand">
        <Form.Label><strong>Brand:</strong></Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formSize">
        <Form.Label><strong>Size:</strong></Form.Label>
        <Form.Control
          type="text"
          name="size"
          value={formData.size}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formCondition">
        <Form.Label><strong>Condition:</strong></Form.Label>
        <Form.Control
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formMaterial">
        <Form.Label><strong>Material:</strong></Form.Label>
        <Form.Control
          type="text"
          name="material"
          value={formData.material}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formRecommendation">
        <Form.Label><strong>Recommendation:</strong></Form.Label>
        <div className="bg-info p-2 mt-1">
          <FaRecycle className="me-1" /> {/* Recycle icon */}
          <span>{formData.recommendation}</span>
        </div>
      </Form.Group>

      <Form.Label><strong>Donation Method:</strong></Form.Label>
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
          <Form.Label><strong>Donation Center:</strong></Form.Label>
          {formData.donation_centers.map((center, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={center}
              name="donation_center"
              value={center}
              checked={formData.donation_center === center}
              onChange={handleRadioChange}
            />
          ))}
        </div>
      )}

      <div className="text-end mt-3"> {/* Align button to the right */}
        <Button variant="primary" type="submit">
          Complete
        </Button>
      </div>
    </Form>
  );
};

export default DonationDetailsConfirmation;
