"use client";
import { Plus } from 'lucide-react'
import React, { use } from 'react'
import Link from 'next/link'
export const Noassignments = () => {
    return (
        <>
            <main style={{
                width: "100%", height: "calc(100vh - 80px)", padding: "90px 16px 90px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden",
            }}
            >
                <div
                    className="flex flex-col items-center justify-center gap-3"
                    style={{
                        width: "100%",
                        maxWidth: "760px",
                    }}
                >

                    {/* IMAGE */}
                    <img
                        src="/illustrations.png"
                        alt="Illustration"
                        style={{
                            width: "100%",
                            maxWidth: "320px",
                            height: "auto",
                            objectFit: "contain",
                        }}
                    />

                    {/* TEXT CONTENT */}
                    <div
                        style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                        }}
                    >

                        <h2
                            className="text-[#303030] text-[20px] font-bold leading-[140%] tracking-[-0.04em] text-center flex items-center justify-center"
                            style={{
                                textAlign: "center",
                            }}
                        >
                            No assignments yet
                        </h2>

                        <p
                            className="text-[16px] font-normal leading-[140%] tracking-[-0.04em] text-center flex items-center justify-center text-[#5e5e5e] whitespace-normal"
                            style={{
                                textAlign: "center",
                                marginTop: "10px",
                                lineHeight: "140%",
                                wordBreak: "break-word",
                            }}
                        >
                            Create your first assignment to start collecting and grading
                            student submissions. You can set up rubrics, define marking
                            criteria, and let AI assist with grading.
                        </p>

                    </div>

                    {/* CREATE BUTTON */}
                    <div
                        style={{
                            padding: "1.5px",
                            borderRadius: 100,
                            background:
                                "linear-gradient(135deg, #FF7950 0%, #C0350A 100%)",
                            marginTop: 20,
                            width: "100%",
                            maxWidth: "320px",
                        }}
                    >

                        <Link
                            href="/assignments/new"
                            style={{ textDecoration: "none" }}
                        >

                            <button
                                style={{
                                    width: "100%",
                                    background: "#161616",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 100,
                                    fontSize: 13.5,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 6,
                                    fontFamily: "inherit",
                                    padding: "12px 18px",
                                }}
                            >

                                <Plus
                                    size={14}
                                    strokeWidth={2.2}
                                    color="#fff"
                                />

                                Create Your First Assignment

                            </button>

                        </Link>

                    </div>

                </div>

            </main>
        </>
    )
}
