import DefaultLayout from '../../components/layouts/DefaultLayout';
import ComingSoonAlert from '../../components/placeholders/ComingSoonAlert';

WalletCreationPage.getLayout = (page) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default function WalletCreationPage() {
    return <ComingSoonAlert></ComingSoonAlert>;
}
