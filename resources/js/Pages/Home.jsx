import React from "react";
import { usePage } from "@inertiajs/inertia-react";
import Layout from "@Layout";
import { useTranslation } from "react-i18next";

export default function Home() {
    const page = usePage();
    const { message } = page.props;
    const { t } = useTranslation();

    return (
        <Layout title="Home">

            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold">{message}</h1>
            </div>
            <h1 className="text-3xl font-bold underline">{t("Hello world!")}</h1>
        </Layout>
    );
}
