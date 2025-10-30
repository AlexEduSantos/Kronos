import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/_components/ui/accordion";
import { Card } from "@/_components/ui/card";
import ProfileDetails from "./_components/profile-details";

const Settings = () => {
  return (
    <Card className="m-2 p-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Perfil de usuário</AccordionTrigger>
          <AccordionContent className="">
            <ProfileDetails />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default Settings;
