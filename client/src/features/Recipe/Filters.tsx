import {Combobox, InputBase, Input, useCombobox} from "@mantine/core";
import React, {useState} from "react";

const options1 = {increasing: "Increasing", decreasing: "Decreasing",};
const options2 = {rating: "Rating", reviews: "Reviews", calories: "Calories",};

export const Filters = () => {
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

    return (
        <div className="filters">
            Filters:
            <Combobox
                store={sortingCombobox}
                onOptionSubmit={(val) => {
                    setSortingValue(val);
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
        </div>
    );
};
