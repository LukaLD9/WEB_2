import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
    Input
} from "@nextui-org/react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";


// Function to validate the data before sending it to the API
function validateData(data: any) {
  if (data.name.length === 0) {
    return false;
  }
  if (data.winPoints < 0 || data.winPoints > 100) {
    return false;
  }
  if (data.drawPoints < 0 || data.drawPoints > 100) {
    return false;
  }
  if (data.lossPoints < 0 || data.lossPoints > 100) {
    return false;
  }
  if (data.competitors.split(/[\n;]/)
    .filter((competitor: string) => competitor.length > 0)
    .length < 4 ||
  data.competitors.split(/[\n;]/)
    .filter((competitor: string) => competitor.length > 0)
    .length > 8) {
    return false;
  }
  return true;
}


export default function CreateCompetition() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { user } = useAuth0();
  const idUser = user?.sub;

  const [competitionData, setCompetitionData] = useState({
    name: '',
    winPoints: 0,
    drawPoints: 0,
    lossPoints: 0,
    competitors: '',
  });

  const handleInputChange = (event : any) => {
    const { name, value } = event.target;
    setCompetitionData({
      ...competitionData,
      [name]: value,
    });
  };

  const createCompetition = () => {
    // Check if the data is valid
    if (!validateData(competitionData)) {
      return;
    }


    // Prepare the data for the API request
    const dataToSend = {
      name: competitionData.name,
      system: competitionData.winPoints + "/" + competitionData.drawPoints + "/" + competitionData.lossPoints,
      idUser: idUser,
      // competitors are divided by new line, or by ;, don't care about spaces, don't consider empty lines
      competitors: competitionData.competitors.split(/[\n;]/)
          .map((competitor: string) => competitor.trim())
          .filter((competitor: string) => competitor.length > 0),
    };

    
    // Send the request to the API, try to catch errors
    axios.post('http://localhost:5000/api/competition/create', dataToSend)
        .then((response) => {
            console.log(response);
            window.location.reload();
        }
    ).catch((error) => {
        console.log(error);
    });
    
  };
  

  return (
    <>
      <Button onPress={onOpen}>Create new competition</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">New competition</ModalHeader>
              <ModalBody>
                <Input
                    name="name"
                    value={competitionData.name}
                    onChange={handleInputChange}
                    autoFocus
                    label="Name"
                    placeholder="Enter name of competition"
                    variant="bordered"
                    isInvalid={competitionData.name.length === 0}
                    errorMessage="Name is required"
                />
                <div className="flex gap-4">
                    <Input
                        name="winPoints"
                        value={competitionData.winPoints.toString()}
                        onChange={handleInputChange}
                        label="Win"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                    />
                    <Input
                        name="drawPoints"
                        value={competitionData.drawPoints.toString()}
                        onChange={handleInputChange}
                        label="Draw"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                    />
                    <Input
                        name="lossPoints"
                        value={competitionData.lossPoints.toString()}
                        onChange={handleInputChange}
                        label="Loss"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                    />
                </div>
                    <Textarea
                        name="competitors"
                        value={competitionData.competitors}
                        onChange={handleInputChange}
                        label="Competitors"
                        placeholder="Enter 4 to 8 competitors, each in a new line or divided by ;"
                        variant="bordered"
                        isInvalid={
                            competitionData.competitors.split(/[\n;]/)
                                .filter((competitor: string) => competitor.length > 0)
                                .length < 4 ||
                            competitionData.competitors.split(/[\n;]/)
                                .filter((competitor: string) => competitor.length > 0)
                                .length > 8
                        }
                        errorMessage="Competitors are required, 4 to 8"
                    />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={() => {onClose();
                        createCompetition();
                        }}>
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
