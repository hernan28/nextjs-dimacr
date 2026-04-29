import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from 'lucide-react';

export default function DesktopNav() {
    return (
        <nav className="flex">
        <FlyoutLink href="/catalog" id={1} FlyoutContent={CatalogoTab}>Catálogo(Nuevo)</FlyoutLink>
        <FlyoutLink href="/" id={2} FlyoutContent={OtroTab}>Otro Tab</FlyoutLink>
        <Link href={"/"}>Buscar</Link>
        </nav>
    );
}

const FlyoutLink = ({ children, href, FlyoutContent, id }: { children: React.ReactNode; id:number; href: string; FlyoutContent?: React.ElementType; }) => {
    const [open, setOpen] = useState(false);

    const showFlyout = open && FlyoutContent;

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="group relative h-fit w-fit">
            <Link href={href} id={id} className={`relative flex items-center gap-1 rounded-full px-6 py-3 transition-colors
                ${open ? " bg-neutral-100 text-neutral-900" : "text-neutral-600"}`}>
                {children}
                <ChevronDown
                    size={14}
                    className={`transition-transform ${open ? "rotate-180" : ""}`} />
                {/* <span
                    style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-red-600 transition-transform duration-300 ease-out" /> */}
            </Link>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, y: 15, scale: 1 }}
                        exit={{ opacity: 0, y: 0, scale: 0.9 }}
                        style={{ translateX: "-50%" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute left-1/2 top-14 bg-transparent text-black">
                        <div className="absolute -top-14 left-0 right-0 h-14 bg-transparent" />
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const CatalogoTab = () => {
    return (
        <div className="w-64 bg-white p-10 shadow-xl rounded-lg">
            <div className="mb-3 space-y-3">
                <h3 className="font-semibold">For Individuals</h3>
                <a href="#" className="block text-sm hover:underline">
                    Introduction
                </a>
                <a href="#" className="block text-sm hover:underline">
                    Pay as you go
                </a>
            </div>
            <div className="mb-6 space-y-3">
                <h3 className="font-semibold">For Companies</h3>
                <a href="#" className="block text-sm hover:underline">
                    Startups
                </a>
                <a href="#" className="block text-sm hover:underline">
                    SMBs
                </a>
                <a href="#" className="block text-sm hover:underline">
                    Enterprise
                </a>
            </div>
            <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
                Contact sales
            </button>
        </div>
    );
}

const OtroTab = ({ menuItems }: { menuItems: string }) => {
    if (!menuItems?.categories) {
        return <nav>Error, por favor recargue la página</nav>;
    }

    return (

        <nav className="space-y-3 grid grid-cols-4 gap-4">

            {menuItems.categories.map(cat => {
                const subCats = menuItems.subcategories?.filter((sub: any) => sub.category?._id === cat._id) || [];

                return (
                    <div key={cat._id} className="mb-4 flex flex-col">
                        <a
                            href={`/catalog?category=${cat._id}`}
                            className="font-semibold text-neutral-900 mb-2 hover:text-red-500 transition-colors"
                        >
                            {cat.title}
                        </a>
                        <ul className="space-y-1 pl-4">
                            {subCats.map(sub => (
                                <li key={sub._id}>
                                    <a
                                        href={`/catalog?category=${cat._id}&subcategory=${sub._id}`}
                                        className="text-sm text-neutral-600 hover:text-red-500 cursor-pointer transition-colors"
                                    >
                                        {sub.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </nav>

    );
}





