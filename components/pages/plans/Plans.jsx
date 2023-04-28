// Dependencies.
import React, { useState, useEffect } from "react";

// Helpers.
import makeRequest from "@helpers/makeRequest";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// Components.
import Button from "@components/common/Button";
import Loader from "@components/common/Loader";
import Plan from "./Plan";
import CreatePlan from "./CreatePlan";
import UpdatePlan from "./UpdatePlan";
import DeletePlan from "./DeletePlan";

// Styles.
import styles from "@styles/components/pages/plans/Plans.module.scss";

// Icons.
const openBoxIcon = <FontAwesomeIcon icon={faBoxOpen} />;

// Default data.
const defaultPlan = {
  _id: "",
  name: "",
  description: "",
};

const defaultModalFlags = {
  createPlan: false,
  updatePlan: false,
  deletePlan: false,
};

export default function Plans() {
  // State.
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(defaultPlan);
  const [isLoading, setIsLoading] = useState(false);

  // Modals flags to handle them.
  const [showModals, setShowModals] = useState(defaultModalFlags);

  /**
   * @async
   * @function
   * @name getPlans
   * @description Gets all available plans.
   * @returns {void}
   */
  async function getPlans() {
    try {
      setIsLoading(true);

      // Request options.
      const options = {
        url: "/plans",
      };

      // Request.
      const response = await makeRequest(options);

      // Check for errors.
      if (response.httpStatus != 200) {
        console.log(`Error: ${response.message}`);
        return;
      }

      // Fill plans.
      setPlans(response.data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * @function
   * @name getPlansOnMount
   * @description Get plans on component mount.
   * @return {void}
   */
  useEffect(() => {
    getPlans();
  }, []);

  /**
   * @function
   * @name renderPlans
   * @description Renders a list of plans depending on the state.
   * @return {JSX.Element} - The appropriate element to render based on the state.
   */
  function renderPlans() {
    try {
      // When loading.
      if (isLoading) {
        return (
          <div className={styles.container__loader}>
            <Loader />
          </div>
        );
      }

      // When there are plans available.
      if (plans.length > 0) {
        return plans.map((plan) => (
          <Plan
            key={plan._id}
            _id={plan._id}
            name={plan.name}
            description={plan.description}
            setShowModals={setShowModals}
            setCurrentPlan={setCurrentPlan}
          />
        ));
      }

      // When there are not plans available.
      return (
        <div className={styles.container__message}>
          {openBoxIcon}
          <p>
            <strong>No plans available.</strong>
          </p>
        </div>
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return "";
    }
  }

  return (
    <>
      {/* Title. */}
      <h1 className={styles.title}>Manage your plans</h1>

      <section className={styles.container}>
        {/* Create. */}
        <Button
          text="Create plan"
          type="button"
          ariaLabel="Create plan"
          onClick={() =>
            setShowModals((flags) => ({ ...flags, createPlan: true }))
          }
        />

        {/* List. */}
        {renderPlans()}
      </section>

      {/* Modals. */}
      <CreatePlan
        showModals={showModals}
        setShowModals={setShowModals}
        getPlans={getPlans}
      />

      <UpdatePlan
        showModals={showModals}
        setShowModals={setShowModals}
        currentPlan={currentPlan}
        getPlans={getPlans}
      />

      <DeletePlan
        showModals={showModals}
        setShowModals={setShowModals}
        currentPlan={currentPlan}
        getPlans={getPlans}
      />
    </>
  );
}
