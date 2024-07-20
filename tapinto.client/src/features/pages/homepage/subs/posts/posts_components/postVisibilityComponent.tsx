import { useAppSelector } from "../../../../../../app/store/store";
import { KeyboardArrowDown, Visibility } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Select, Option, selectClasses } from "@mui/joy";

interface IShowTo {
  register: UseFormRegister<FieldValues>;
}

export default function ShowTo({ register }: IShowTo) {
  const { user } = useAppSelector((state) => state.account);
  const Tablet = useMediaQuery("(min-width:1100px)");
  const _showto: string[] | null = user && user?.groups.map((g) => g.groupName);
  user && _showto && _showto?.unshift(user?.school);

  return (
    <>
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Select
          variant="plain"
          placeholder="Post to"
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
              {item.length > 8 ? item.substring(0, 8) + "..." : item}
            </Option>
          ))}
        </Select>
      }
    </>
  );
}
