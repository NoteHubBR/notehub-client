import { Component } from "@/components";
import { Device } from "@/components/devices";
import { useStore } from "@/data/hooks";
import Link from "next/link";

export const Expired = () => {

    const { setStore } = useStore();

    const initAsGuest = () => { setStore({ isExpired: false, isGuest: true }) };

    return (
        <main className="relative w-full h-full flex items-center justify-center dark:bg-dark/50 bg-light/50">
            <Device.Mobile.Header.MainHeader />
            <Component.TsParticles />
            <section
                role="dialog"
                aria-labelledby="dialogTitle"
                aria-describedby="dialogDesc"
                className="overflow-hidden
                max-w-[333px] w-[90%] rounded-md
                flex flex-col
                border dark:border-middark/50 border-midlight/50
                dark:bg-semidark bg-white"
            >
                <header className="p-6 text-center flex flex-col items-center justify-center gap-3">
                    <h2 id="dialogTitle" className="font-bold text-md">Sua sessão expirou!</h2>
                    <p id="dialogDesc" className="text-sm">Entre novamente ou continue como convidado.</p>
                </header>
                <footer className="border-t dark:border-middark/50 border-midlight/50 flex">
                    <button
                        type="button"
                        onClick={initAsGuest}
                        className="group
                        py-2 flex-1
                        font-semibold text-center text-sm
                        dark:bg-dark bg-light
                        hover:opacity-75
                        transition-opacity"
                    >
                        <span className="inline-block group-hover:scale-95 transition-transform duration-300">
                            Continuar
                        </span>
                    </button>
                    <div aria-hidden="true" className="border-l dark:border-middark/50 border-midlight/50" />
                    <Link
                        href="/signin"
                        className="group
                        py-2 flex-1
                        font-semibold text-white text-center text-sm
                        bg-primary
                        hover:opacity-75
                        transition-opacity"
                    >
                        <span className="inline-block group-hover:scale-95 transition-transform duration-300">
                            Entrar
                        </span>
                    </Link>
                </footer>
            </section>
        </main>
    )

}