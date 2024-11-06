import { useAppSelector } from "../../../../../../app/store/store";
import { KeyboardArrowDown, Visibility } from "@mui/icons-material";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Select, Option, selectClasses } from "@mui/joy";

interface IShowActivityTo {
  register: UseFormRegister<FieldValues>;
}

export default function ShowActivityTo({ register }: IShowActivityTo) {
  const { user } = useAppSelector((state) => state.account);
  const _showto: string[] | null = user && user?.groups.map((g) => g.groupName);

  return (
    <>
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Select
          variant="plain"
          placeholder="Activity to"
          {...register("groupName", {
            setValueAs(value) {
              if (!value || value === undefined || value === "")
                return _showto![0];
              else return value;
            },
          })}
          defaultValue={_showto![0]}
          startDecorator={<Visibility />}
          indicator={<KeyboardArrowDown />}
          sx={{
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          {_showto?.map((item, index) => (
            <Option key={index} value={item}>
              {item.length > 10 ? item.substring(0, 10) + "..." : item}
            </Option>
          ))}
        </Select>
      }
    </>
  );
}
