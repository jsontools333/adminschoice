declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"10-must-have-oreilly-books-for-system-administrators.mdx": {
	id: "10-must-have-oreilly-books-for-system-administrators.mdx";
  slug: "10-must-have-oreilly-books-for-system-administrators";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"5-things-slowing-down-your-internet-speed-and-what-to-do-about-them.mdx": {
	id: "5-things-slowing-down-your-internet-speed-and-what-to-do-about-them.mdx";
  slug: "5-things-slowing-down-your-internet-speed-and-what-to-do-about-them";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"7-code-issues-sonarqube-can-detec.mdx": {
	id: "7-code-issues-sonarqube-can-detec.mdx";
  slug: "7-code-issues-sonarqube-can-detec";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"7-python-operators-that-you-need-to-know.mdx": {
	id: "7-python-operators-that-you-need-to-know.mdx";
  slug: "7-python-operators-that-you-need-to-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"8-best-text-editors-for-linux-desktop.mdx": {
	id: "8-best-text-editors-for-linux-desktop.mdx";
  slug: "8-best-text-editors-for-linux-desktop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"a-simple-python-tutorial-for-beginners-get-started-now.mdx": {
	id: "a-simple-python-tutorial-for-beginners-get-started-now.mdx";
  slug: "a-simple-python-tutorial-for-beginners-get-started-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"application-monitoring.mdx": {
	id: "application-monitoring.mdx";
  slug: "application-monitoring";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"awk.mdx": {
	id: "awk.mdx";
  slug: "awk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"aws-resource-types-in-terraform-25-essential-examples-you-can-copy-and-use.mdx": {
	id: "aws-resource-types-in-terraform-25-essential-examples-you-can-copy-and-use.mdx";
  slug: "aws-resource-types-in-terraform-25-essential-examples-you-can-copy-and-use";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"aws-services-not-covered-by-free-tier.mdx": {
	id: "aws-services-not-covered-by-free-tier.mdx";
  slug: "aws-services-not-covered-by-free-tier";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"backup-commands-examples.mdx": {
	id: "backup-commands-examples.mdx";
  slug: "backup-commands-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"bash-for-loop-explained-with-examples.mdx": {
	id: "bash-for-loop-explained-with-examples.mdx";
  slug: "bash-for-loop-explained-with-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"bash-in-windows-10-ten-facts-you-must-know.mdx": {
	id: "bash-in-windows-10-ten-facts-you-must-know.mdx";
  slug: "bash-in-windows-10-ten-facts-you-must-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"bash-positional-parameters.mdx": {
	id: "bash-positional-parameters.mdx";
  slug: "bash-positional-parameters";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"best-programming-languages-to-study-at-college.mdx": {
	id: "best-programming-languages-to-study-at-college.mdx";
  slug: "best-programming-languages-to-study-at-college";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"biggest-cloud-security-threats-when-moving-to-cloud-in-2019.mdx": {
	id: "biggest-cloud-security-threats-when-moving-to-cloud-in-2019.mdx";
  slug: "biggest-cloud-security-threats-when-moving-to-cloud-in-2019";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"bitcoin-miner-virus-how-to-detect-and-delete-it.mdx": {
	id: "bitcoin-miner-virus-how-to-detect-and-delete-it.mdx";
  slug: "bitcoin-miner-virus-how-to-detect-and-delete-it";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"booting-problems-in-solaris.mdx": {
	id: "booting-problems-in-solaris.mdx";
  slug: "booting-problems-in-solaris";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"booting-process-in-solaris.mdx": {
	id: "booting-process-in-solaris.mdx";
  slug: "booting-process-in-solaris";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"changing-ethernet-speed-duplex-mode-in-solaris.mdx": {
	id: "changing-ethernet-speed-duplex-mode-in-solaris.mdx";
  slug: "changing-ethernet-speed-duplex-mode-in-solaris";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"chmod-quick-referance-with-examples.mdx": {
	id: "chmod-quick-referance-with-examples.mdx";
  slug: "chmod-quick-referance-with-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"chrome-tab-manager-for-devops-find-search-and-switch-open-tabs-instantly.mdx": {
	id: "chrome-tab-manager-for-devops-find-search-and-switch-open-tabs-instantly.mdx";
  slug: "chrome-tab-manager-for-devops-find-search-and-switch-open-tabs-instantly";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"containers-vs-vms-top-5-differences-you-must-know.mdx": {
	id: "containers-vs-vms-top-5-differences-you-must-know.mdx";
  slug: "containers-vs-vms-top-5-differences-you-must-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"convert-nested-json-to-csv-online-free-fast-json-to-csv-converter-handles-arrays-large-files.mdx": {
	id: "convert-nested-json-to-csv-online-free-fast-json-to-csv-converter-handles-arrays-large-files.mdx";
  slug: "convert-nested-json-to-csv-online-free-fast-json-to-csv-converter-handles-arrays-large-files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cpio-gnu.mdx": {
	id: "cpio-gnu.mdx";
  slug: "cpio-gnu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"crontab-examples.mdx": {
	id: "crontab-examples.mdx";
  slug: "crontab-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"crontab-generator-easily-create-cron-jobs-in-seconds.mdx": {
	id: "crontab-generator-easily-create-cron-jobs-in-seconds.mdx";
  slug: "crontab-generator-easily-create-cron-jobs-in-seconds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"crontab-quick-reference.mdx": {
	id: "crontab-quick-reference.mdx";
  slug: "crontab-quick-reference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cut-the-manual-work-with-these-9-incredibly-useful-python-libraries-for-automation.mdx": {
	id: "cut-the-manual-work-with-these-9-incredibly-useful-python-libraries-for-automation.mdx";
  slug: "cut-the-manual-work-with-these-9-incredibly-useful-python-libraries-for-automation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"dns-sinkhole-setup-your-defense-against-bot-net-controllers.mdx": {
	id: "dns-sinkhole-setup-your-defense-against-bot-net-controllers.mdx";
  slug: "dns-sinkhole-setup-your-defense-against-bot-net-controllers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"dns-troubleshooting.mdx": {
	id: "dns-troubleshooting.mdx";
  slug: "dns-troubleshooting";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"domain-name-service.mdx": {
	id: "domain-name-service.mdx";
  slug: "domain-name-service";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"download-linux-top-10-free-linux-distributions-for-desktop-and-servers.mdx": {
	id: "download-linux-top-10-free-linux-distributions-for-desktop-and-servers.mdx";
  slug: "download-linux-top-10-free-linux-distributions-for-desktop-and-servers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"exit-error-codes-in-bash-and-linux-os.mdx": {
	id: "exit-error-codes-in-bash-and-linux-os.mdx";
  slug: "exit-error-codes-in-bash-and-linux-os";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"fedora-24-top-features-you-should-know.mdx": {
	id: "fedora-24-top-features-you-should-know.mdx";
  slug: "fedora-24-top-features-you-should-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"find-command-15-ways-to-find-files-in-unix-and-linux.mdx": {
	id: "find-command-15-ways-to-find-files-in-unix-and-linux.mdx";
  slug: "find-command-15-ways-to-find-files-in-unix-and-linux";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"free-docker-training-for-beginners-intermediate-advanced-users.mdx": {
	id: "free-docker-training-for-beginners-intermediate-advanced-users.mdx";
  slug: "free-docker-training-for-beginners-intermediate-advanced-users";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"fsck-messages-meaning-and-solutions.mdx": {
	id: "fsck-messages-meaning-and-solutions.mdx";
  slug: "fsck-messages-meaning-and-solutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"geek-speaks.mdx": {
	id: "geek-speaks.mdx";
  slug: "geek-speaks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"getting-started-with-python.mdx": {
	id: "getting-started-with-python.mdx";
  slug: "getting-started-with-python";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"git-checkout-remote-branch.mdx": {
	id: "git-checkout-remote-branch.mdx";
  slug: "git-checkout-remote-branch";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"heartbleed-bug-frequently-asked-questions.mdx": {
	id: "heartbleed-bug-frequently-asked-questions.mdx";
  slug: "heartbleed-bug-frequently-asked-questions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"how-does-ssl-work-all-about-ssl-certificates-and-tls-certificates.mdx": {
	id: "how-does-ssl-work-all-about-ssl-certificates-and-tls-certificates.mdx";
  slug: "how-does-ssl-work-all-about-ssl-certificates-and-tls-certificates";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"how-to-remove-m-in-linux-unix.mdx": {
	id: "how-to-remove-m-in-linux-unix.mdx";
  slug: "how-to-remove-m-in-linux-unix";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"how-to-start-a-developer-career.mdx": {
	id: "how-to-start-a-developer-career.mdx";
  slug: "how-to-start-a-developer-career";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"identity-protection-online-a-simple-tip.mdx": {
	id: "identity-protection-online-a-simple-tip.mdx";
  slug: "identity-protection-online-a-simple-tip";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"iostat-vmstat-netstat.mdx": {
	id: "iostat-vmstat-netstat.mdx";
  slug: "iostat-vmstat-netstat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"is-your-free-vpn-putting-your-data-at-risk.mdx": {
	id: "is-your-free-vpn-putting-your-data-at-risk.mdx";
  slug: "is-your-free-vpn-putting-your-data-at-risk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"krack-key-reinstallation-attacks-on-wpa2-protocol.mdx": {
	id: "krack-key-reinstallation-attacks-on-wpa2-protocol.mdx";
  slug: "krack-key-reinstallation-attacks-on-wpa2-protocol";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"kubernetes-commands-you-must-know.mdx": {
	id: "kubernetes-commands-you-must-know.mdx";
  slug: "kubernetes-commands-you-must-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"learn-how-to-obfuscate-javascript-with-node-js.mdx": {
	id: "learn-how-to-obfuscate-javascript-with-node-js.mdx";
  slug: "learn-how-to-obfuscate-javascript-with-node-js";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"linux-piestack-corruption-cve-2017-1000253-bug-and-security-vulnerability.mdx": {
	id: "linux-piestack-corruption-cve-2017-1000253-bug-and-security-vulnerability.mdx";
  slug: "linux-piestack-corruption-cve-2017-1000253-bug-and-security-vulnerability";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"linux-rpms-all-you-need-to-know.mdx": {
	id: "linux-rpms-all-you-need-to-know.mdx";
  slug: "linux-rpms-all-you-need-to-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"man-command-in-linux-and-unix.mdx": {
	id: "man-command-in-linux-and-unix.mdx";
  slug: "man-command-in-linux-and-unix";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"merger-of-security-compliance-what-it-means-for-cloud-developers.mdx": {
	id: "merger-of-security-compliance-what-it-means-for-cloud-developers.mdx";
  slug: "merger-of-security-compliance-what-it-means-for-cloud-developers";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"mongodb-ransom-attacks-hit-27000-systems.mdx": {
	id: "mongodb-ransom-attacks-hit-27000-systems.mdx";
  slug: "mongodb-ransom-attacks-hit-27000-systems";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"most-used-docker-command-that-you-need-to-know.mdx": {
	id: "most-used-docker-command-that-you-need-to-know.mdx";
  slug: "most-used-docker-command-that-you-need-to-know";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"netstat-10-most-common-usage-with-examples.mdx": {
	id: "netstat-10-most-common-usage-with-examples.mdx";
  slug: "netstat-10-most-common-usage-with-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"nisplus-installation-administration.mdx": {
	id: "nisplus-installation-administration.mdx";
  slug: "nisplus-installation-administration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"php-date-format.mdx": {
	id: "php-date-format.mdx";
  slug: "php-date-format";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"php-redirect-how-to-examples-issues-solutions.mdx": {
	id: "php-redirect-how-to-examples-issues-solutions.mdx";
  slug: "php-redirect-how-to-examples-issues-solutions";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"pip-how-to-use-pip-python-package-installer.mdx": {
	id: "pip-how-to-use-pip-python-package-installer.mdx";
  slug: "pip-how-to-use-pip-python-package-installer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-for-data-science-top-10-python-libraries-to-elevate-your-skills.mdx": {
	id: "python-for-data-science-top-10-python-libraries-to-elevate-your-skills.mdx";
  slug: "python-for-data-science-top-10-python-libraries-to-elevate-your-skills";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-for-loop-top-10-examples-to-get-started-now.mdx": {
	id: "python-for-loop-top-10-examples-to-get-started-now.mdx";
  slug: "python-for-loop-top-10-examples-to-get-started-now";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-installation-in-linux.mdx": {
	id: "python-installation-in-linux.mdx";
  slug: "python-installation-in-linux";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-installation-in-windows-10-11.mdx": {
	id: "python-installation-in-windows-10-11.mdx";
  slug: "python-installation-in-windows-10-11";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-sort-or-sorted-which-one-to-chose-for-your-program.mdx": {
	id: "python-sort-or-sorted-which-one-to-chose-for-your-program.mdx";
  slug: "python-sort-or-sorted-which-one-to-chose-for-your-program";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"python-syntax-how-to-use-pyhton-for-beginners.mdx": {
	id: "python-syntax-how-to-use-pyhton-for-beginners.mdx";
  slug: "python-syntax-how-to-use-pyhton-for-beginners";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"red-hat-7-x-installation-step-by-step-guide.mdx": {
	id: "red-hat-7-x-installation-step-by-step-guide.mdx";
  slug: "red-hat-7-x-installation-step-by-step-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"refdesk.mdx": {
	id: "refdesk.mdx";
  slug: "refdesk";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"repairing-unix-file-system-fsck.mdx": {
	id: "repairing-unix-file-system-fsck.mdx";
  slug: "repairing-unix-file-system-fsck";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"rmdir-force-force-remove-linux-directories.mdx": {
	id: "rmdir-force-force-remove-linux-directories.mdx";
  slug: "rmdir-force-force-remove-linux-directories";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"securing-solaris.mdx": {
	id: "securing-solaris.mdx";
  slug: "securing-solaris";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"sha-1-collision-insecurity-of-sha-1-is-exposed-by-google.mdx": {
	id: "sha-1-collision-insecurity-of-sha-1-is-exposed-by-google.mdx";
  slug: "sha-1-collision-insecurity-of-sha-1-is-exposed-by-google";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"six-common-mistakes-for-javascript-programmers-to-avoid.mdx": {
	id: "six-common-mistakes-for-javascript-programmers-to-avoid.mdx";
  slug: "six-common-mistakes-for-javascript-programmers-to-avoid";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"six-common-mistakes-for-python-programmers-to-avoid.mdx": {
	id: "six-common-mistakes-for-python-programmers-to-avoid.mdx";
  slug: "six-common-mistakes-for-python-programmers-to-avoid";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-error-messages-a-d.mdx": {
	id: "solaris-error-messages-a-d.mdx";
  slug: "solaris-error-messages-a-d";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-error-messages-e-k.mdx": {
	id: "solaris-error-messages-e-k.mdx";
  slug: "solaris-error-messages-e-k";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-error-messages-l-n.mdx": {
	id: "solaris-error-messages-l-n.mdx";
  slug: "solaris-error-messages-l-n";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-error-messages-o-s.mdx": {
	id: "solaris-error-messages-o-s.mdx";
  slug: "solaris-error-messages-o-s";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-error-messages-t-z.mdx": {
	id: "solaris-error-messages-t-z.mdx";
  slug: "solaris-error-messages-t-z";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-installation.mdx": {
	id: "solaris-installation.mdx";
  slug: "solaris-installation";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-jumpstart-howto-guide.mdx": {
	id: "solaris-jumpstart-howto-guide.mdx";
  slug: "solaris-jumpstart-howto-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solaris-network-configuration.mdx": {
	id: "solaris-network-configuration.mdx";
  slug: "solaris-network-configuration";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"solstice-disksuite-guide.mdx": {
	id: "solstice-disksuite-guide.mdx";
  slug: "solstice-disksuite-guide";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"ssh-examples-usage-options-protocol.mdx": {
	id: "ssh-examples-usage-options-protocol.mdx";
  slug: "ssh-examples-usage-options-protocol";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"ssh-without-password.mdx": {
	id: "ssh-without-password.mdx";
  slug: "ssh-without-password";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"strace-examples-options-usage.mdx": {
	id: "strace-examples-options-usage.mdx";
  slug: "strace-examples-options-usage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"sun-openboot-parameters-and-commands.mdx": {
	id: "sun-openboot-parameters-and-commands.mdx";
  slug: "sun-openboot-parameters-and-commands";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"terraform-7-essential-commands-for-managing-infrastructure.mdx": {
	id: "terraform-7-essential-commands-for-managing-infrastructure.mdx";
  slug: "terraform-7-essential-commands-for-managing-infrastructure";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"terraform-vs-kubernetes-key-differences.mdx": {
	id: "terraform-vs-kubernetes-key-differences.mdx";
  slug: "terraform-vs-kubernetes-key-differences";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"the-definitive-list-of-aws-terraform-resource-types.mdx": {
	id: "the-definitive-list-of-aws-terraform-resource-types.mdx";
  slug: "the-definitive-list-of-aws-terraform-resource-types";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"the-top-security-breaches-in-history.mdx": {
	id: "the-top-security-breaches-in-history.mdx";
  slug: "the-top-security-breaches-in-history";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"tls-vs-ssl-whats-the-difference.mdx": {
	id: "tls-vs-ssl-whats-the-difference.mdx";
  slug: "tls-vs-ssl-whats-the-difference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"top-10-bash-programming-guides-reference-tools.mdx": {
	id: "top-10-bash-programming-guides-reference-tools.mdx";
  slug: "top-10-bash-programming-guides-reference-tools";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"top-10-most-popular-programming-languages.mdx": {
	id: "top-10-most-popular-programming-languages.mdx";
  slug: "top-10-most-popular-programming-languages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"top-10-must-have-books-for-unix-and-linux-administartors.mdx": {
	id: "top-10-must-have-books-for-unix-and-linux-administartors.mdx";
  slug: "top-10-must-have-books-for-unix-and-linux-administartors";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"top-5-reasons-why-you-should-switch-to-linux.mdx": {
	id: "top-5-reasons-why-you-should-switch-to-linux.mdx";
  slug: "top-5-reasons-why-you-should-switch-to-linux";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"unix-commands-tutorial.mdx": {
	id: "unix-commands-tutorial.mdx";
  slug: "unix-commands-tutorial";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"unix-date-format-examples.mdx": {
	id: "unix-date-format-examples.mdx";
  slug: "unix-date-format-examples";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"unix-for-beginer.mdx": {
	id: "unix-for-beginer.mdx";
  slug: "unix-for-beginer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"unix-tech-tips.mdx": {
	id: "unix-tech-tips.mdx";
  slug: "unix-tech-tips";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"veritas-volume-manager-vxassist.mdx": {
	id: "veritas-volume-manager-vxassist.mdx";
  slug: "veritas-volume-manager-vxassist";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"veritas-volume-manager-vxdiskadm.mdx": {
	id: "veritas-volume-manager-vxdiskadm.mdx";
  slug: "veritas-volume-manager-vxdiskadm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"vi-editor-cheat-sheet-in-pdf-format.mdx": {
	id: "vi-editor-cheat-sheet-in-pdf-format.mdx";
  slug: "vi-editor-cheat-sheet-in-pdf-format";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"vi-editor-quick-reference.mdx": {
	id: "vi-editor-quick-reference.mdx";
  slug: "vi-editor-quick-reference";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"what-can-you-do-to-secure-your-data-in-the-cloud.mdx": {
	id: "what-can-you-do-to-secure-your-data-in-the-cloud.mdx";
  slug: "what-can-you-do-to-secure-your-data-in-the-cloud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"what-does-21-mean-in-shell.mdx": {
	id: "what-does-21-mean-in-shell.mdx";
  slug: "what-does-21-mean-in-shell";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"what-is-cloud-computing-in-simplest-terms.mdx": {
	id: "what-is-cloud-computing-in-simplest-terms.mdx";
  slug: "what-is-cloud-computing-in-simplest-terms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"what-is-hadoop-facts-you-must-know-about-apache-hadoop.mdx": {
	id: "what-is-hadoop-facts-you-must-know-about-apache-hadoop.mdx";
  slug: "what-is-hadoop-facts-you-must-know-about-apache-hadoop";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"what-is-load-balancer-and-how-it-works.mdx": {
	id: "what-is-load-balancer-and-how-it-works.mdx";
  slug: "what-is-load-balancer-and-how-it-works";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"why-linux-is-the-better-choice-for-the-digital-age.mdx": {
	id: "why-linux-is-the-better-choice-for-the-digital-age.mdx";
  slug: "why-linux-is-the-better-choice-for-the-digital-age";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"youre-more-likely-to-fall-victim-to-a-cyberattack-than-a-home-invasion.mdx": {
	id: "youre-more-likely-to-fall-victim-to-a-cyberattack-than-a-home-invasion.mdx";
  slug: "youre-more-likely-to-fall-victim-to-a-cyberattack-than-a-home-invasion";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
