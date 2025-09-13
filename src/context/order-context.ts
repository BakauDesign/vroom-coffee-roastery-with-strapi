  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { InferOutput } from 'valibot';

import { createContextId } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    PurchasedProductSchema,
    PurchasedRoastedBeanSchema
} from '~/schema/order';

export type PurchasedProductType = InferOutput<typeof PurchasedProductSchema>;
export type RoastedBeanProductType = InferOutput<typeof PurchasedRoastedBeanSchema>;
export type PurchasedToolProductType = InferOutput<typeof PurchasedProductSchema>;

export type OrderCartItems = PurchasedProductType[];
export type OrderRoastedBeanCartItems = RoastedBeanProductType[];
export type OrderToolCartItems = PurchasedToolProductType[];

export const OrderContext = createContextId<Signal<OrderCartItems>>('order.context');
export const OrderRoastedBeanContext = createContextId<Signal<OrderRoastedBeanCartItems>>('roasted-bean-order.context');
export const OrderToolContext = createContextId<Signal<OrderToolCartItems>>('tool-order.context');