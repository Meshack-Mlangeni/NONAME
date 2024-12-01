import { Button, Card, Divider, Typography } from "@mui/joy";
import { AdminPanelSettingsRounded, SchoolTwoTone } from "@mui/icons-material";
import SubSection from "../../../../components/subSection";
import ExcelForm from "./excelForm";

export default function Home2() {
  return (
    <>
      <Card sx={{ ml: 5, mr: 5, mt: 2, p: 4, boxShadow: "sm" }}>
        <Typography level="h1" sx={{ fontWeight: "700" }}>
          <AdminPanelSettingsRounded
            style={{ marginTop: "-10px", marginRight: "8px" }}
          />
          Administrator Control Panel
        </Typography>
        <Typography level="title-md">
          Oversee and manage all aspects of the application, including user
          accounts. Ensure smooth operation and maintain high standards across
          the institutions.
        </Typography>
        <Divider />

        <SubSection
          icon={<SchoolTwoTone />}
          discr="Upload Official Excel File For All Schools Published By DOE."
          size="h3"
          title="Upload School Excel Sheet"
          hasDivider
          key={1}
        >
          <ExcelForm />
        </SubSection>

        <Button size="sm" variant="solid">
          Go Home
        </Button>
      </Card>
    </>
  );
}
