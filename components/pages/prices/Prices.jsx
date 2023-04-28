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
import CreatePrice from "./CreatePrice";
import Price from "./Price";
import UpdatePrice from "./UpdatePrice";
import DeletePrice from "./DeletePrice";

// Styles.
import styles from "@styles/components/pages/prices/Prices.module.scss";

// Icons.
const openBoxIcon = <FontAwesomeIcon icon={faBoxOpen} />;

// Default data.
const defaultPrice = {
  _id: "",
  name: "",
  description: "",
};

const defaultModalFlags = {
  createPrice: false,
  updatePrice: false,
  deletePrice: false,
};

export default function Prices() {
  // State.
  const [prices, setPrices] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);

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

      // Format plans.
      const formattedPlans = response.data.map((plan) => ({
        label: plan.name,
        value: plan._id,
      }));

      // Fill plans.
      setPlans(formattedPlans);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name getZipCodes
   * @description Gets all available zip codes.
   * @returns {void}
   */
  async function getZipCodes() {
    try {
      // Request options.
      const options = {
        url: "/zip-codes",
      };

      // Request.
      const response = await makeRequest(options);

      // Check for errors.
      if (response.httpStatus != 200) {
        console.log(`Error: ${response.message}`);
        return;
      }

      // Format zip-codes.
      const formattedZipCodes = response.data.map((zipCode) => ({
        label: zipCode.zipCode,
        value: zipCode._id,
      }));

      // Fill zip codes.
      setZipCodes(formattedZipCodes);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  /**
   * @async
   * @function
   * @name getPrices
   * @description Gets all available prices.
   * @returns {void}
   */
  async function getPrices() {
    try {
      setIsLoading(true);

      // Request options.
      const options = {
        url: "/prices",
      };

      // Request.
      const response = await makeRequest(options);

      // Check for errors.
      if (response.httpStatus != 200) {
        console.log(`Error: ${response.message}`);
        return;
      }

      // Fill prices.
      setPrices(response.data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * @function
   * @name getDataOnMount
   * @description Get plans, zip codes and prices on component mount.
   * @return {void}
   */
  useEffect(() => {
    getPlans();
    getZipCodes();
    getPrices();
  }, []);

  /**
   * @function
   * @name renderPrices
   * @description Renders a list of prices depending on the state.
   * @return {JSX.Element} - The appropriate element to render based on the state.
   */
  function renderPrices() {
    try {
      // When loading.
      if (isLoading) {
        return (
          <div className={styles.container__loader}>
            <Loader />
          </div>
        );
      }

      // When there are prices available.
      if (prices.length > 0) {
        return prices.map((price) => (
          <Price
            key={price._id}
            _id={price._id}
            price={price.price}
            zipCode={price.zipCode}
            plan={price.plan}
            setShowModals={setShowModals}
            setCurrentPrice={setCurrentPrice}
          />
        ));
      }

      // When there are not prices available.
      return (
        <div className={styles.container__message}>
          {openBoxIcon}
          <p>
            <strong>No prices available.</strong>
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
      <h1 className={styles.title}>Manage your prices</h1>

      <section className={styles.container}>
        {/* Create. */}
        <Button
          text="Create price"
          type="button"
          ariaLabel="Create price"
          onClick={() =>
            setShowModals((flags) => ({ ...flags, createPrice: true }))
          }
        />

        {/* List. */}
        {renderPrices()}
      </section>

      {/* Modals. */}
      <CreatePrice
        showModals={showModals}
        setShowModals={setShowModals}
        getPrices={getPrices}
        zipCodes={zipCodes}
        plans={plans}
      />

      <UpdatePrice
        showModals={showModals}
        setShowModals={setShowModals}
        getPrices={getPrices}
        zipCodes={zipCodes}
        plans={plans}
        currentPrice={currentPrice}
      />

      <DeletePrice
        showModals={showModals}
        setShowModals={setShowModals}
        currentPrice={currentPrice}
        getPrices={getPrices}
      />
    </>
  );
}
