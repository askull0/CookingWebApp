import {Combobox, InputBase, Input, useCombobox} from "@mantine/core";
import React, {useState} from "react";

const options1 = {increasing: "increasing", decreasing: "decreasing",};
const options2 = {rating: "rating", reviews: "reviews", calories: "calories",};

interface FiltersProps {
    setSortFilter: React.Dispatch<React.SetStateAction<string | null>>;
    setPickFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

export const Filters: React.FC<FiltersProps> = ({setSortFilter, setPickFilter}) => {
    const sortingCombobox = useCombobox({
        onDropdownClose: () => sortingCombobox.resetSelectedOption(),
    });

    const [sortingValue, setSortingValue] = useState<string | null>(null);

    const optionsComponents1 = Object.entries(options1).map(([key, label]) => (
        <Combobox.Option value={key} key={key}>
            {label}
        </Combobox.Option>
    ));

    const otherSortingCombobox = useCombobox({
        onDropdownClose: () => otherSortingCombobox.resetSelectedOption(),
    });

    const [otherSortingValue, setOtherSortingValue] = useState<string | null>(null);

    const optionsComponents2 = Object.entries(options2).map(([key, label]) => (
        <Combobox.Option value={key} key={key}>
            {label}
        </Combobox.Option>
    ));

    const handleSortFilter = (val:string) => {
        if(val == options1.decreasing){
          setSortFilter('desc')
        }

        else if(val == options1.increasing)
          setSortFilter('asc');
    };

  const handlePickFilter = (val:string) => {
    if(val == options2.calories)
      setPickFilter('calories')
    else if(val == options2.rating)
      setPickFilter('rating');
    else if(val  == options2.reviews)
      setPickFilter('reviews');
  };

    return (
        <div className="filters">
            Filters:
            <Combobox
                store={sortingCombobox}
                onOptionSubmit={(val) => {
                    setSortingValue(val);
                    handleSortFilter(val);
                    sortingCombobox.closeDropdown();
                }}

            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron/>}
                        rightSectionPointerEvents="none"
                        onClick={() => sortingCombobox.toggleDropdown()}
                    >
                        {sortingValue || <Input.Placeholder>Pick filter</Input.Placeholder>}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{optionsComponents1}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>

            {/* Other Combobox */}
            <Combobox
                store={otherSortingCombobox}
                onOptionSubmit={(val) => {
                    setOtherSortingValue(val);
                    handlePickFilter(val);
                    otherSortingCombobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <InputBase
                        component="button"
                        type="button"
                        pointer
                        rightSection={<Combobox.Chevron/>}
                        rightSectionPointerEvents="none"
                        onClick={() => otherSortingCombobox.toggleDropdown()}
                    >
                        {otherSortingValue || <Input.Placeholder>Pick filter</Input.Placeholder>}
                    </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>{optionsComponents2}</Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>
            {/*  <button onClick={handleConfirmClick}>Confirm</button>*/}
        </div>
    );
};
