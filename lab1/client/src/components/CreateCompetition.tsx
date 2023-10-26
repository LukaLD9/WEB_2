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


export default function CreateCompetition() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
    // Prepare the data for the API request
    const dataToSend = {
      name: competitionData.name,
      winPoints: competitionData.winPoints,
      drawPoints: competitionData.drawPoints,
      lossPoints: competitionData.lossPoints,
      competitors: competitionData.competitors.split('\n').map((line) => line.trim()),
    };

    console.log(dataToSend);
    
    // Send the request to the API, try to catch errors
    axios.post('http://localhost:5000/competition', dataToSend)
        .then((response) => {
            console.log(response);
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
                        placeholder="Enter competitors, each in a new line"
                        variant="bordered"
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
