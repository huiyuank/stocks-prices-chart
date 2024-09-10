import MultiSelect from "@/charts/components/plot/multi-select";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";

const mockOptions = [
  "Apple",
  "Orange",
  "Pear",
  "Mango",
  "Durian",
  "Mangosteen",
  "Banana",
];

function MultiSelectTest({ maximum }: { maximum?: number }) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <MultiSelect
      options={mockOptions}
      maximum={maximum}
      selectedValue={selectedValues}
      addValue={(value) => {
        setSelectedValues([...selectedValues, value]);
      }}
      removeValue={(value) => {
        setSelectedValues((selectedValue) =>
          selectedValue.filter((currValue) => currValue !== value)
        );
      }}
    />
  );
}

describe(MultiSelect, () => {
  it("displays selected options in the input box", async () => {
    render(<MultiSelectTest />);

    const selectedValuesContainer = screen.getByTestId(
      "selected-values-container"
    );
    expect(within(selectedValuesContainer).findByText(/banana/i)).toBeNull;

    const optionsContainer = screen.getByTestId("options-container");
    fireEvent.click(within(optionsContainer).getByText(/banana/i));
    const selectedValue = await within(selectedValuesContainer).findByText(
      /banana/i
    );
    expect(selectedValue).toBeInTheDocument;

    fireEvent.click(selectedValue);
    expect(within(selectedValuesContainer).findByText(/banana/i)).toBeNull;
  });

  it("limits number of selected stocks to maximum", async () => {
    const testingMaximum = 3;
    render(<MultiSelectTest maximum={testingMaximum} />);

    const selectedValuesContainer = screen.getByTestId(
      "selected-values-container"
    );

    fireEvent.click(screen.getByText(/apple/i));
    fireEvent.click(screen.getByText(/banana/i));
    fireEvent.click(screen.getByText(/pear/i));
    fireEvent.click(screen.getAllByText(/mango/i)[0]);
    expect(within(selectedValuesContainer).findByText(/pear/i))
      .toBeInTheDocument;
    expect(selectedValuesContainer.children.length).toEqual(testingMaximum);
    expect(within(selectedValuesContainer).findByText(/mango/i)).toBeNull;
  });
});
