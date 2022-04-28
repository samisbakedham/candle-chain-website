import DefaultLayout from '../../components/layouts/DefaultLayout';
import ComingSoonAlert from '../../components/placeholders/ComingSoonAlert';

WalletsPage.getLayout = (page) => {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default function WalletsPage() {
    return <ComingSoonAlert></ComingSoonAlert>;
}
