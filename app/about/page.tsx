import AboutMain from "@ui/about/AboutMain";
import EmployeesSlide from "@ui/about/EmployeesSlide";
import Statistics from "@ui/about/Statistics";
import Container from "@ui/shared/Container";
import { STAFF_TYPE } from "@/app/lib/typeDefinitions";
import { createSlides, fetchStaff } from "@/app/lib/utils";
import StaffSlider from "@ui/about/StaffSlider";
import Features from "@ui/shared/Features";

export default async function About() {
  const staff = await fetchStaff();

  const STAFF = staff.map((emp) => {
    return {
      id: emp.id,
      name: emp.name,
      image: emp.image,
      jobTitle: emp.jobtitle,
      twitterLink: emp.sociallinks.twitterLink,
      instagramLink: emp.sociallinks.instagramLink,
      linkedinLink: emp.sociallinks.linkedinLink,
    };
  });
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
          <StaffSlider
            slides={staffSlides}
            options={{ loop: true, duration: 60 }}
          />
        </section>
        <section className="pb-35">
          <Features />
        </section>
      </Container>
    </>
  );
}
