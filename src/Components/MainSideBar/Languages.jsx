import React, { useEffect, useState } from 'react';
import { Checkbox } from '@mui/material';

// Assuming colors is defined somewhere
import { colors } from '../../colors.js';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Languages = ({ onFilterSelect,onRemoveFilter, initialSelectedValues }) => {
    const languages = ["English", "Arabic"];

    const [selectedValues, setSelectedValues] = useState(initialSelectedValues || []); // Initialize selectedValues state with initialSelectedValues

    useEffect(() => {
        setSelectedValues(initialSelectedValues || []); // Update selectedValues state when initialSelectedValues change
      }, [initialSelectedValues]);
      
      const handleDurationSelection = (value) => {
        const isChecked = selectedValues.includes(value);
        if (isChecked) {
          // Remove from applied filters
          const updatedFilters = selectedValues.filter(item => item !== value);
          setSelectedValues(updatedFilters); // Update selected values state
          onRemoveFilter(updatedFilters); // Notify parent component to remove filter
        } else {
          // Add to applied filters
          const updatedFilters = [...selectedValues, value];
          setSelectedValues(updatedFilters); // Update selected values state
          onFilterSelect(updatedFilters); // Notify parent component to add filter
        }
      };

    return (
        <div className="language my-2 ">
            <h5>Languages</h5>
            {languages.map((language, index) => (
                <div key={index}>
                    <Checkbox
                        {...label}
                        value={language}
                        sx={{
                            color: colors.violet,
                            '&.Mui-checked': {
                                color: colors.violet
                            }
                        }}
                        onChange={() => handleDurationSelection(language)}
                    />
                    {language}
                </div>
            ))}
        </div>
    );
}

export default Languages;
