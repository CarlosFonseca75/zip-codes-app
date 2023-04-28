// Dependencies.
import React, { useState } from "react";
import Image from "next/image";

// Helpers.
import makeRequest from "@helpers/makeRequest";
import showAlert from "@helpers/showAlert";

// Icons.
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

// Components.
import Button from "@components/common/Button";
import Loader from "@components/common/Loader";
import Input from "@components/common/Input";
import Switch from "@components/common/Switch";
import Plan from "./Plan";

// Styles.
import styles from "@styles/components/pages/index/SearchPlans.module.scss";

// Icons.
const openBoxIcon = <FontAwesomeIcon icon={faBoxOpen} />;

export default function SearchPlans() {
  // State.
  const [zipCode, setZipCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [plans, setPlans] = useState([]);

  /**
   * @function
   * @name onChange
   * @description Sets zipCode when the input value is changed.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  function onChange(event) {
    try {
      setZipCode(event.target.value);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name submit
   * @description Submits the form and search for the plans with prices.
   * @param {Event} event - The event object.
   * @returns {void}
   */
  async function submit(event) {
    try {
      event.preventDefault();

      // Loader.
      setIsLoading(true);

      // Request options.
      const options = {
        url: `/public/plans-prices/${zipCode}`,
      };

      // Request.
      const { data, httpStatus, message } = await makeRequest(options);

      // Check for errors.
      if (httpStatus != 200) {
        showAlert({
          title: "Error",
          type: "danger",
          message,
        });
        return;
      }

      // Fill plans.
      setPlans(data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

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
          <div className={styles["plans-container__loader"]}>
            <Loader />
          </div>
        );
      }

      // When there are plans available.
      if (plans.length > 0) {
        return plans.map((plan) => (
          <Plan
            key={plan._id}
            name={plan?.plan?.name}
            description={plan?.plan?.description}
            price={isMonthly ? +(plan?.price / 12).toFixed(2) : +plan?.price}
          />
        ));
      }

      // When there are not plans available.
      return (
        <div className={styles["plans-container__message"]}>
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
      <h1 className={styles.title}>
        <strong>Search your plan</strong>
      </h1>

      {/* Search. */}
      <section className={styles["search-container"]}>
        <form
          aria-label="Search plans form"
          className={styles["search-container__form"]}
          onSubmit={submit}
        >
          <Input
            id="zipCode"
            type="text"
            name="zipCode"
            value={zipCode}
            placeholder="Enter your zip code, e.g. 37207"
            onChange={onChange}
            minLength={5}
            maxLength={5}
            required
          />

          <Button
            text="Search"
            type="submit"
            ariaLabel="Search"
            disabled={isLoading}
          />
        </form>
      </section>

      {/* Plans prices. */}
      <section className={styles["plans-container"]}>
        {/* Switch prices. */}
        <Switch
          id="prices"
          leftText="Yearly"
          rightText="Monthtly"
          checked={isMonthly}
          onChange={setIsMonthly}
        />

        {/* List. */}
        {renderPlans()}
      </section>
    </>
  );
}
