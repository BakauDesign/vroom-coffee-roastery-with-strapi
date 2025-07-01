import * as v from 'valibot';

import { createContextId } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';
import { PurchasedProductSchema } from '~/schema/order';

export type PurchasedProductType = v.InferOutput<typeof PurchasedProductSchema>;

export type OrderCartItems = PurchasedProductType[];

export const OrderContext = createContextId<Signal<OrderCartItems>>('order.context');