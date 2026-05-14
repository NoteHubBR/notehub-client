import { GoogleOAuthProvider } from '@react-oauth/google';
import {
    LoadingProvider,
    MaintenanceProvider,
    MenuProvider,
    ProgressBarProvider,
    ScreenProvider,
    ScreenWidthProvider,
    ThemeProvider,
    UserFlamesProvider,
    UserFollowingProvider,
    UserHistoryProvider,
    UserNotesProvider,
    UserNotificationsProvider,
    UserPreferencesProvider,
    UserProvider,
    UserSessionPreferencesProvider,
    UserStoreProvider,
    UserSubscriptionsProvider,
    UserTagsProvider,
} from '@/data/contexts';

type ProviderComponent = React.ComponentType<{ children: React.ReactNode }>;

const composeProviders = (providers: ProviderComponent[]) =>
    providers.reduce(
        (Accumulated, Current): ProviderComponent =>
            ({ children }) => (
                <Accumulated>
                    <Current>{children}</Current>
                </Accumulated>
            )
    )

const GoogleProvider: ProviderComponent = ({ children }) => {
    const GCI = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    return (
        <GoogleOAuthProvider clientId={GCI ?? 'GCI'}>
            {children}
        </GoogleOAuthProvider>
    )
}

const userProviders: ProviderComponent[] = [
    GoogleProvider,
    UserPreferencesProvider,
    UserSessionPreferencesProvider,
    UserStoreProvider,
    MaintenanceProvider,
    UserFollowingProvider,
    UserNotesProvider,
    UserFlamesProvider,
    UserTagsProvider,
    UserHistoryProvider,
    UserSubscriptionsProvider,
    UserProvider,
    UserNotificationsProvider,
]

const appProviders: ProviderComponent[] = [
    ScreenProvider,
    ScreenWidthProvider,
    ProgressBarProvider,
    LoadingProvider,
    composeProviders(userProviders),
    ThemeProvider,
    MenuProvider,
]

export const Providers = composeProviders(appProviders);