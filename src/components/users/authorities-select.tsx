"use client";

import React, { useEffect, useState } from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { getAuthorities } from "@/lib/actions/authorities.action";
import { AuthorityDTO } from "@/types/authorities";
import { UiAttributes } from "@/types/ui-components";

interface AuthoritiesSelectProps {
  form: any;
  label: string;
}

const AuthoritiesSelect = ({
  form,
  label,
  required,
}: AuthoritiesSelectProps & UiAttributes) => {
  const [authorities, setAuthorities] = useState<AuthorityDTO[]>();

  useEffect(() => {
    const fetchAuthorities = async () => {
      const data = await getAuthorities(0);
      setAuthorities(data.content);
    };

    fetchAuthorities();
  }, []);

  if (authorities === undefined) {
    return <div>Cannot load authorities</div>;
  }

  // Map authorities to options
  const options = authorities.map((auth) => ({
    value: auth.name,
    label: auth.descriptiveName,
  }));

  return (
    <FormField
      control={form.control}
      name="authorities"
      render={({ field }) => {
        // Transform field.value (array of AuthorityDTO) to match MultiSelect's defaultValue (array of options)
        const defaultValues =
          field.value?.map((auth: AuthorityDTO) => auth.name) ?? [];

        return (
          <FormItem className="space-y-0">
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
            <MultiSelect
              options={options}
              onValueChange={(newValues) =>
                field.onChange(
                  newValues
                    .map((selectedValue) =>
                      authorities.find((auth) => auth.name === selectedValue),
                    )
                    .filter(Boolean)
                    .map((auth) => auth?.name),
                )
              }
              defaultValue={defaultValues}
              placeholder="Select authorities"
              animation={2}
              maxCount={3}
            />
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default AuthoritiesSelect;
