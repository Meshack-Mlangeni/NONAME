import { useForm, FieldValues } from "react-hook-form";
import UpLoadFileButton from "../activity/activityComponents/uploadfilebutton";
import { Button } from "@mui/joy";
import { useAppDispatch } from "../../../../../app/store/store";
import { uploadExcelSchoolSheetAsync } from "./adminSlice";

export default function ExcelForm() {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm({
    mode: "all",
  });

  const submitExcelSheet = async (data: FieldValues) => {
    console.log(data);
    await dispatch(uploadExcelSchoolSheetAsync(data));
  };

  return (
    <form onSubmit={handleSubmit(submitExcelSheet)} method="put">
      <UpLoadFileButton size="md" control={control} />
      <br />
      <Button disabled={!isDirty} sx={{ mt: 2 }} type="submit">
        Submit Excel File
      </Button>
    </form>
  );
}
