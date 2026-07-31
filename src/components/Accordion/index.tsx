import React, { FC } from "react";
import { Accordion as CustomAccordion } from "react-bootstrap";

type AccordionItems = {
  title: string;
  content: any;
};

interface CustomAccordionProps {
  items: AccordionItems[];
}

const Accordion: FC<CustomAccordionProps> = ({ items }) => {
  return (
    <CustomAccordion>
      {items.map((item: any, index: number) => (
        <CustomAccordion.Item key={`accordion-item-${item?.title}`} eventKey={index.toString()}>
          <CustomAccordion.Header>{item.title}</CustomAccordion.Header>
          <CustomAccordion.Body>{item?.content}</CustomAccordion.Body>
        </CustomAccordion.Item>
      ))}
    </CustomAccordion>
  );
};

export default Accordion;
