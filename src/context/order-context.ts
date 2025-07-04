  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { InferOutput } from 'valibot';

import { createContextId } from '@builder.io/qwik';
import type { Signal } from '@builder.io/qwik';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
    PurchasedProductSchema
} from '~/schema/order';

export type PurchasedProductType = InferOutput<typeof PurchasedProductSchema>;

export type OrderCartItems = PurchasedProductType[];

export const OrderContext = createContextId<Signal<OrderCartItems>>('order.context');