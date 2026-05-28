"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bricolage_Grotesque } from "next/font/google";

import {
    LayoutGrid,
    Users,
    FileText,
    Bot,
    Library,
    Settings,
    Plus,
    Bell,
    X,
    MoreHorizontal,
    ChevronDown,
    ArrowLeft,
} from "lucide-react";

const navItems = [
    { title: "Home", icon: LayoutGrid, href: "/dashboard", mobileShow: true },
    { title: "My Groups", icon: Users, href: "/groups", mobileShow: false },
    { title: "Assignments", icon: FileText, href: "/assignments", mobileShow: true },
    { title: "AI Teacher's Toolkit", icon: Bot, href: "/toolkit", mobileShow: true },
    { title: "My Library", icon: Library, href: "/library", mobileShow: true },
];
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
});

export default function Sidebar() {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            {/* Desktop sidebar wrapper — hidden on mobile/tablet */}
            <div className="hidden lg:block bg-[#e7e7e7]" style={{ padding: 10 }}>
                <aside
                    className="flex w-[260px] h-[97vh] bg-white border-r border-[#EBEBEB] flex-col justify-between px-3 shrink-0 rounded-4xl"
                    style={{ fontFamily: "'Inter', sans-serif", paddingTop: 28, paddingBottom: 24, paddingLeft: 10, paddingRight: 10 }}
                >
                    <div>
                        {/* LOGO */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 10px", marginBottom: 32 }}>
                            <Image
                                src="https://framerusercontent.com/images/lbpUIfvyh4wK5fzYeLgNIYSWSo.png"
                                alt="VedaAI Logo"
                                width={34}
                                height={34}
                                style={{ borderRadius: 8 }}
                            />
                            <span className={bricolage.className} style={{ fontSize: 22, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
                                VedaAI
                            </span>
                        </div>

                        {/* CREATE BUTTON */}
                        <div style={{ padding: "1.5px", borderRadius: 100, background: "linear-gradient(135deg, #FF7950 0%, #C0350A 100%)", marginBottom: 32 }}>
                            <Link href="/assignments/new" style={{ textDecoration: "none" }}>
                                <button style={{
                                    width: "100%", background: "#161616", color: "#fff", border: "none",
                                    borderRadius: 100, padding: "12px 0", fontSize: 13.5, fontWeight: 500,
                                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                    gap: 6, fontFamily: "inherit",
                                }}>
                                    <Plus size={14} strokeWidth={2.2} color="#fff" />
                                    Create Assignment
                                </button>
                            </Link>
                        </div>

                        {/* NAV */}
                        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.title} href={item.href} style={{ textDecoration: "none" }}>
                                        <div
                                            style={{
                                                display: "flex", alignItems: "center", gap: 10,
                                                padding: "10px 12px", borderRadius: 10,
                                                background: isActive ? "#F3F3F3" : "transparent",
                                                cursor: "pointer", transition: "background 0.15s",
                                            }}
                                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = "#F8F8F8"; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = isActive ? "#F3F3F3" : "transparent"; }}
                                        >
                                            <Icon size={17} strokeWidth={isActive ? 2 : 1.7} color={isActive ? "#1A1A1A" : "#9A9A9A"} />
                                            <span style={{ fontSize: 13.5, fontWeight: isActive ? 500 : 400, color: isActive ? "#1A1A1A" : "#9A9A9A" }}>
                                                {item.title}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* BOTTOM */}
                    <div>
                        <Link href="/settings" style={{ textDecoration: "none" }}>
                            <div
                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer", marginBottom: 14, transition: "background 0.15s" }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "#F8F8F8")}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "transparent")}
                            >
                                <Settings size={17} strokeWidth={1.7} color="#9A9A9A" />
                                <span style={{ fontSize: 13.5, color: "#9A9A9A" }}>Settings</span>
                            </div>
                        </Link>

                        {/* SCHOOL CARD */}
                        <div style={{ background: "#F7F7F7", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 11 }}>
                            <Image
                                src="/profile.jpg"
                                alt="School avatar"
                                width={40}
                                height={40}
                                style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                            />
                            <div>
                                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>Delhi Public School</p>
                                <p style={{ margin: 0, fontSize: 12, color: "#999999", marginTop: 2 }}>Bokaro Steel City</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* MOBILE + TABLET  TOP HEADER */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EBEBEB] flex items-center justify-between"
                style={{
                    padding: "10px 16px",
                    fontFamily: "'Inter', sans-serif",
                    height: "60px",
                }}
            >

                {/* LEFT */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <ArrowLeft size={20} />

                    <LayoutGrid size={20} />

                    <p
                        style={{
                            fontWeight: 500,
                            color: "#1A1A1A",
                            margin: 0,
                        }}
                    >
                        Veda AI
                    </p>
                </div>

                {/* RIGHT */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >

                    <Bell size={20} />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <img
                            className="rounded-full object-cover"
                            src="/profile.jpg"
                            width={32}
                            height={32}
                            alt="Profile"
                        />

                        <p
                            style={{
                                fontWeight: 500,
                                margin: 0,
                                color: "#1A1A1A",
                            }}
                        >
                            Keshav
                        </p>

                        <ChevronDown size={18} />

                    </div>

                </div>

            </header>

            {/* MOBILE BOTTOM NAV */}
            <nav
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] flex items-center h-[62px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {navItems.filter((i) => i.mobileShow).map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.title} href={item.href} style={{ textDecoration: "none", flex: 1 }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, paddingTop: 2 }}>
                                <Icon size={20} strokeWidth={isActive ? 2 : 1.6} color={isActive ? "#FFFFFF" : "#555"} />
                                <span style={{ fontSize: 10, fontWeight: isActive ? 500 : 400, color: isActive ? "#FFFFFF" : "#555", whiteSpace: "nowrap" }}>
                                    {item.title === "AI Teacher's Toolkit" ? "AI Toolkit" : item.title}
                                </span>
                            </div>
                        </Link>
                    );
                })}

                {/* MORE button */}
                <button
                    onClick={() => setDrawerOpen(true)}
                    style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, paddingTop: 2 }}
                >
                    <MoreHorizontal size={20} strokeWidth={1.6} color="#555" />
                    <span style={{ fontSize: 10, color: "#555" }}>More</span>
                </button>
            </nav>

            {/* BACKDROP */}
            <div
                className="lg:hidden fixed inset-0 z-[60]"
                style={{
                    background: "rgba(0,0,0,0.4)",
                    opacity: drawerOpen ? 1 : 0,
                    pointerEvents: drawerOpen ? "auto" : "none",
                    transition: "opacity 0.25s ease",
                }}
                onClick={() => setDrawerOpen(false)}
            />

            {/* SLIDE-UP DRAWER */}
            <div
                className="lg:hidden fixed left-0 right-0 bottom-0 z-[70] bg-white"
                style={{
                    borderRadius: "20px 20px 0 0",
                    transform: drawerOpen ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
                    fontFamily: "'Inter', sans-serif",
                    paddingBottom: "calc(62px + env(safe-area-inset-bottom))",
                }}
            >
                {/* Drag handle */}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, paddingBottom: 6 }}>
                    <div style={{ width: 32, height: 4, background: "#E0E0E0", borderRadius: 99 }} />
                </div>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Image
                            src="https://framerusercontent.com/images/lbpUIfvyh4wK5fzYeLgNIYSWSo.png"
                            alt="VedaAI Logo"
                            width={30}
                            height={30}
                            style={{ borderRadius: 7, margin: "10px" }}
                        />
                        <span style={{ fontSize: 18, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.2px" }}>VedaAI</span>
                    </div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        style={{ background: "#F3F3F3", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                    >
                        <X size={15} strokeWidth={2.2} color="#1A1A1A" />
                    </button>
                </div>

                {/* Thin divider */}
                <div style={{ height: 1, background: "#F0F0F0", marginLeft: 16, marginRight: 16 }} />

                {/* Nav items */}
                <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "12px 12px 0" }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setDrawerOpen(false)}
                                style={{ textDecoration: "none" }}
                            >
                                <div
                                    style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "11px 12px", borderRadius: 10,
                                        background: isActive ? "#F3F3F3" : "transparent",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    <Icon size={17} strokeWidth={isActive ? 2 : 1.7} color={isActive ? "#1A1A1A" : "#9A9A9A"} />
                                    <span style={{ fontSize: 14, fontWeight: isActive ? 500 : 400, color: isActive ? "#1A1A1A" : "#9A9A9A" }}>
                                        {item.title}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Divider */}
                <div style={{ height: 1, background: "#F0F0F0", margin: "10px 16px" }} />

                {/* Settings */}
                <div style={{ padding: "0 12px" }}>
                    <Link href="/settings" onClick={() => setDrawerOpen(false)} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 12px", borderRadius: 10 }}>
                            <Settings size={17} strokeWidth={1.7} color="#9A9A9A" />
                            <span style={{ fontSize: 14, color: "#9A9A9A" }}>Settings</span>
                        </div>
                    </Link>
                </div>

                {/* School card */}
                <div style={{ margin: "8px 16px 0", background: "#F7F7F7", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 11 }}>
                    <Image
                        src="https://i.pravatar.cc/100?img=5"
                        alt="School avatar"
                        width={38}
                        height={38}
                        style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div>
                        <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.3 }}>Delhi Public School</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#999999", marginTop: 2 }}>Bokaro Steel City</p>
                    </div>
                </div>
            </div>
        </>
    );
}