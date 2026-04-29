import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function DesktopNav() {
    return (
        <FlyoutLink href="/catalog" FlyoutContent={CatalogoTab}>Catálogo(Nuevo)</FlyoutLink>
    );
}

const FlyoutLink = ({ children, href, FlyoutContent }: { children: React.ReactNode; href: string; FlyoutContent?: React.ElementType; }) => {
    const [open, setOpen] = useState(true);

    const showFlyout = open && FlyoutContent;

    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            className="group relative h-fit w-fit">
            <Link href={href} className="relative">
                {children}
                <span
                    style={{transform: open ? "scaleX(1)" : "scaleX(0)"}}
                    className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-red-600 transition-transform duration-300 ease-out" />
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