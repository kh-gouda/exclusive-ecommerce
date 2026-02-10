import AboutMain from "@ui/about/AboutMain";
import EmployeesSlide from "@ui/about/EmployeesSlide";
import Statistics from "@ui/about/Statistics";
import Container from "@ui/shared/Container";
import { STAFF_TYPE } from "@/app/lib/typeDefinitions";
import { STAFF } from "@/app/lib/dummyData";
import { createSlides } from "@/app/lib/utils";
import StaffSlider from "@ui/about/StaffSlider";
import Features from "@ui/shared/Features";

export default function About() {
  const employees = createSlides<STAFF_TYPE>(STAFF, 3);
  const staffSlides = employees.map((slide, index) => (
    <EmployeesSlide key={index} staff={slide} />
  ));
  return (
    <>
      <Container>breadcrumbs</Container>
      <AboutMain />
      <Container>
        <Statistics />
        <section className="py-35">
          <StaffSlider slides={staffSlides} />
        </section>
        <section className="pb-35">
          <Features />
        </section>
      </Container>
    </>
  );
}
