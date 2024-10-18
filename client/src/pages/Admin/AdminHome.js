import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome <i className="text-success" >{user?.name}</i>
          </h1>
          <h3 style={{color: "blue"}}>Manage Blood Bank App.... </h3>
          <hr />
          <p>
          This blood bank is a specialized center that collects, tests, processes, stores, and distributes 
          blood and blood products to hospitals and healthcare facilities for transfusion purposes. Blood banks
          play a crucial role in ensuring a safe and adequate supply of blood for patients in need of transfusions 
          due to medical conditions, surgeries, or emergencies.
          <br></br><br></br>
          <b>Key functions of this blood bank include:</b>
          <br></br>
          <br></br>
          <b>Blood Collection:</b> Blood banks organize blood donation drives and receive blood donations from voluntary donors. 
          Donors are screened for eligibility based on health criteria to ensure the safety of donated blood.
          <br></br>
          <b>Blood Testing:</b> Donated blood undergoes rigorous testing for blood type (A, B, AB, O) and Rh factor, as well as 
          screening for infectious diseases such as HIV, hepatitis B and C, syphilis, and others. Testing ensures that only 
          safe blood is used for transfusions.
          <br></br>
          <b>Blood Processing:</b> Once blood is deemed safe for transfusion, it is processed to separate it into various components 
          like red blood cells, plasma, platelets, and cryoprecipitate. This allows healthcare providers to administer specific
          blood components based on patient needs.
          <br></br>
          <b>Storage and Inventory Management:</b> Blood components are stored under controlled conditions (such as refrigeration or 
          freezing) to maintain their viability until needed. Blood banks carefully manage inventory to ensure an adequate supply 
          of blood types and components at all times.
          <br></br>
          <b>Distribution:</b> Blood banks supply hospitals and healthcare facilities with the requested blood components. 
          They manage emergency requests for blood and coordinate timely delivery to meet patient needs.
          <br></br>
          <b>Emergency Preparedness:</b> Blood banks play a critical role in disaster response by maintaining sufficient blood reserves 
          and collaborating with healthcare providers during emergencies or mass casualty incidents.
          <br></br>
          <b>Donor Recruitment and Education:</b> Blood banks conduct donor recruitment campaigns to encourage voluntary blood donation. 
          They also provide education about the importance of blood donation and its impact on saving lives.
          <br></br>
          <br></br>
          Overall, blood banks are essential pillars of healthcare systems, ensuring the availability of safe blood for 
          transfusions and supporting patient care. They adhere to strict regulatory standards and quality control measures to 
          uphold the safety and effectiveness of blood transfusion practices. Blood donation is a voluntary and altruistic act 
          that helps save lives and improve health outcomes for patients in need.
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default AdminHome;