import template1 from "../../../../assets/landing-page/templates/template1.png";
import template2 from "../../../../assets/landing-page/templates/template2.png";
import template3 from "../../../../assets/landing-page/templates/template3.png";
import template4 from "../../../../assets/landing-page/templates/template4.png";
import template5 from "../../../../assets/landing-page/templates/template5.png";
import template6 from "../../../../assets/landing-page/templates/template6.png";
import template7 from "../../../../assets/landing-page/templates/template7.png";
import template8 from "../../../../assets/landing-page/templates/template8.png";
import template9 from "../../../../assets/landing-page/templates/template9.png";
import template10 from "../../../../assets/landing-page/templates/template10.png";
import SingleTemplate from "./components/SingleTemplate";

const Templates = () => {
  const templates = [
    template1,
    template2,
    template3,
    template4,
    template5,
    template6,
    template7,
    template8,
    template9,
    template10,
  ];

  return (
    <>
      <div className="bg-primary pt-20 md:pt-35 text-white dark:bg-primary-900 dark:text-white -mb-30">
        <div className="w-9/10 m-auto">
          <h3 className="font-bold w-4/5 md:w-3/4 mx-auto text-4xl md:text-5xl mb-20 text-center">
            Choose templates that work for you
          </h3>
          <p className="font-medium w-4/5 md:w-3/4 text-xl lg:text-2xl m-auto text-center mb-15">
            Create stunning emails and newsletters - your way. Choose from
            templates, design with the drag & drop editor, or let AI generate
            custom layouts. MailedIt makes building high-performing campaigns
            easy. Here are a few predefined templates for your reference.
          </p>
          <div className=" m-auto columns-2 sm:columns-4 lg:columns-5 text-center gap-4 2xl:gap-6">
            {templates.map((template, index) => (
              <SingleTemplate key={index} image={template} index = {index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Templates;
