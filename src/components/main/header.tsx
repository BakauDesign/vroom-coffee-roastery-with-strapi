import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

import { MenuItem } from './menu-item';
import { Button } from './button';

export const Header = component$(() => {
    const location = useLocation();
    const pathname = location.url.pathname.replace(/\/+$/, '') || '/';

    const isOpen = useSignal(false);

    return (
        <header class="w-full h-[100px] py-4 px-4 sm:px-6 lg:px-[60px] flex gap-x-12 items-center bg-primary-base border-[3px] border-solid border-neutral-custom-200 fixed">
            <img alt="Logo" class="h-[60px] min-w-[120px] sm:w-[150px] lg:w-[200px] flex items-center justify-center bg-primary-50 rounded-[4px]" />

            <section class="w-full flex items-center justify-end xl:justify-center *:gap-x-6 *:py-2 *:px-3 *:bg-primary-50 *:rounded-full">
                <nav class="hidden md:flex">
                    <MenuItem href="/" state={pathname === "/"}>Home</MenuItem>
                    <MenuItem href="/about-us" state={pathname === "/about-us"}>About Us</MenuItem>

                    <MenuItem state={pathname.startsWith("/products")} asDropdown>
                        <label for="Products" q:slot='label'>Products</label>

                        <MenuItem href="/products/roasted-coffee-beans" q:slot="menu-item" asDropdownItem>Roasted Coffee Beans</MenuItem>
                        <MenuItem href="/products/green-coffee-beans" q:slot="menu-item" asDropdownItem>Green Coffee Beans</MenuItem>
                        <MenuItem href="/products/coffee-tools" q:slot="menu-item" asDropdownItem>Coffee Tools</MenuItem>
                    </MenuItem>

                    <MenuItem href="/contact-us" state={pathname === "/contact-us"}>Contact Us</MenuItem>
                </nav>

                <nav class="flex md:hidden cursor-pointer">
                    <MenuItem state onClick$={() => isOpen.value = true}>Menu</MenuItem>
                </nav>
            </section>

            <section class="hidden xl:block w-full max-w-[204px]">
                <Button
                    variant='primary'
                    size='large'
                    fillContainer={true}
                >
                    Chat on Whatsapp
                </Button>
            </section>

            <aside class={`
                px-9 py-12 top-0 bottom-0 left-0 right-0 fixed flex flex-col justify-between bg-primary-base transition-all duration-300
                ${isOpen.value ? "translate-x-[0] lg:translate-x-[100vw]" : "translate-x-[100vw] lg:translate-x-[100vw]"}
            `}>
                <div class="flex gap-x-8 items-center justify-between">
                    <nav class="flex md:hidden cursor-pointer py-2 px-3 bg-primary-50 rounded-full">
                        <MenuItem state onClick$={() => isOpen.value = false}>Close</MenuItem>
                    </nav>

                    <img alt="Logo" class="h-[60px] w-full min-w-[120px] max-w-[140px] flex items-center justify-center bg-primary-50 rounded-[4px]" />
                </div>

                <div class="h-full flex flex-col gap-y-6 items-center justify-center">
                    <nav class="py-4 px-6 flex flex-col items-center gap-y-6 bg-primary-50 rounded-[36px]">
                        <MenuItem href="/" state={pathname === "/"}>Home</MenuItem>
                        <MenuItem href="/about-us" state={pathname === "/about-us"}>About Us</MenuItem>

                        <MenuItem state={pathname.startsWith("/products")} asDropdown>
                            <label for="Products" q:slot='label'>Products</label>

                            <MenuItem href="/products/roasted-coffee-beans" q:slot="menu-item" asDropdownItem>Roasted Coffee Beans</MenuItem>
                            <MenuItem href="/products/green-coffee-beans" q:slot="menu-item" asDropdownItem>Green Coffee Beans</MenuItem>
                            <MenuItem href="/products/coffee-tools" q:slot="menu-item" asDropdownItem>Coffee Tools</MenuItem>
                        </MenuItem>

                        <MenuItem href="/contact-us" state={pathname === "/contact-us"}>Contact Us</MenuItem>
                    </nav>

                    <section class="w-full max-w-[204px]">
                        <Button
                            variant='primary'
                            size='large'
                            fillContainer={true}
                        >
                            Chat on Whatsapp
                        </Button>
                    </section>
                </div>

            </aside>
        </header>
    );
});