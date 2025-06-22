import {
    $,
    useSignal,
    useTask$
} from "@builder.io/qwik";

/**
 * @typedef {Object} UseDiscountReturn
 * @property {QRL<(event: Event, element: HTMLInputElement) => void>} handlePriceChange - QRL handler to update the product's price.
 * @property {QRL<(event: Event, element: HTMLInputElement) => void>} handleDiscountChange - QRL handler to update the discount percentage.
 * @property {Signal<boolean>} activatedDiscount - A Signal indicating if a discount is currently active.
 * @property {Signal<number>} price - A Signal representing the product's base price.
 * @property {Signal<number>} discountPrice - A Signal representing the price after discount has been applied.
 */

/**
 * `useDiscount` is a Qwik hook that provides reactive state and handlers for managing product pricing and discounts.
 * It calculates the `discountPrice` based on the `price` and `discountPercentage`.
 *
 * @returns {UseDiscountReturn} An object containing signals for discount state and price, along with event handlers.
 */

export function useDiscount() {
    /**
     * @type {Signal<boolean>}
     * A boolean Signal indicating whether the discount feature is considered active.
     * This is an internal state that can be used to control UI elements related to discounts.
     */
    const activatedDiscount = useSignal(false);

    /**
     * @type {Signal<number>}
     * A number Signal representing the base price of the product.
     * This value is updated via the `handlePriceChange` QRL.
     */
    const price = useSignal(0);

    /**
     * @type {Signal<number>}
     * A number Signal representing the discount percentage applied to the product (e.g., 10 for 10%).
     * This value is updated via the `handleDiscountChange` QRL.
     */
    const discountPercentage = useSignal(0);

    /**
     * @type {Signal<number>}
     * A number Signal representing the final price of the product after the discount has been calculated.
     * This value is automatically updated whenever `price` or `discountPercentage` changes.
     */
    const discountPrice = useSignal(0);

    /**
     * A QRL event handler to update the `price` Signal.
     * It parses the input element's value as an integer.
     * @param {Event} _ - The DOM event object (unused).
     * @param {HTMLInputElement} e - The HTML input element that triggered the event.
     */
    const handlePriceChange = $((_: Event, e: HTMLInputElement) => {
        price.value = parseInt(e.value);
    });

    /**
     * A QRL event handler to update the `discountPercentage` Signal.
     * It parses the input element's value as an integer.
     * @param {Event} _ - The DOM event object (unused).
     * @param {HTMLInputElement} e - The HTML input element that triggered the event.
     */
    const handleDiscountChange = $((_: Event, e: HTMLInputElement) => {
        discountPercentage.value = parseInt(e.value);
    });
    
    /**
     * A Qwik `useTask$` that reactively calculates the `discountPrice`.
     * It tracks changes to `activatedDiscount`, `price`, and `discountPercentage`.
     * The `discountPrice` is updated whenever any of these tracked signals change.
     */
    useTask$(({ track }) => {
        track(() => activatedDiscount.value);
        track(() => price.value);
        track(() => discountPercentage.value);
        
        discountPrice.value =  price.value - ((discountPercentage.value / 100) * price.value)
    });

    return {
        handlePriceChange,
        handleDiscountChange,
        activatedDiscount,
        price,
        discountPrice
    }
}