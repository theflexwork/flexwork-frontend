import React from "react";

import ValuesQuerySelect from "@/components/shared/values-query-select";
import { findAccountIndustries } from "@/lib/actions/accounts.action";
import { EntityValueDefinition } from "@/types/commons";
import { FormFieldProps } from "@/types/ui-components";

const AccountIndustriesSelect = ({ form, required }: FormFieldProps) => {
  return (
    <ValuesQuerySelect<EntityValueDefinition>
      form={form}
      queryName="accountIndustries"
      fieldName="industry"
      fieldLabel="Industry"
      fetchDataFn={findAccountIndustries}
      valueKey="value"
      renderTooltip={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.description}`
      }
      renderOption={(entityValueDef: EntityValueDefinition) =>
        `${entityValueDef.value}`
      }
      required={required}
      placeholder="Select industry"
      noDataMessage="No industry found"
      searchPlaceholder="Search industry..."
    />
  );
};

export default AccountIndustriesSelect;
