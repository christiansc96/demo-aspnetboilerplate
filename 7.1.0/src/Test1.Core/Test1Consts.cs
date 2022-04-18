using Test1.Debugging;

namespace Test1
{
    public class Test1Consts
    {
        public const string LocalizationSourceName = "Test1";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "2497cb33a85945978b2ee17e48dc4f48";
    }
}