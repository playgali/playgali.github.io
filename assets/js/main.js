(function () {
    'use strict';

    var body = document.body;
    var menuToggle = document.querySelector('.menu-toggle');
    var siteNav = document.querySelector('.site-nav');
    var terminalModal = document.getElementById('terminal-modal');
    var terminalLaunch = document.getElementById('terminal-launch');
    var terminalForm = document.getElementById('terminal-form');
    var terminalInput = document.getElementById('terminal-input');
    var terminalOutput = document.getElementById('terminal-output');
    var terminalScreen = document.querySelector('.terminal-screen');
    var closeControls = document.querySelectorAll('[data-close-terminal="true"]');
    var lastFocus = null;
    var mobileQuery = window.matchMedia('(max-width: 767px)');

    var commandMap = {
        'summary': 'Senior DevOps and Security Engineer with 15+ years across Linux, cloud platforms, Kubernetes, CI/CD, networking, automation, and hands-on operations. Focused on designing, securing, and stabilizing complex platforms for banking, retail, and enterprise teams.',
        'core skills': [
            '- Cloud: AWS, GCP, Azure',
            '- Infrastructure as Code: Terraform, Ansible',
            '- Containers: Docker, Kubernetes, Helm',
            '- CI/CD: GitHub Actions, Jenkins, GitLab CI',
            '- Observability: Prometheus, Grafana, Alertmanager, logging and monitoring platforms',
            '- Security: secure architecture, hardening, networking, compliance-oriented infrastructure',
            '- Systems: Linux, networking, databases, middleware, production troubleshooting'
        ].join('\n'),
        'professional experience': [
            'One Inc. — Site Reliability Engineering',
            'Built and standardized observability for 30+ applications using Prometheus, Grafana, and Alertmanager, improving operational clarity and incident response.',
            '',
            'Distillery — DevOps / Security / Consulting',
            'Worked across platform security, automation, cloud platforms, Kubernetes, Terraform, CI/CD, and operational support for clients in retail, finance, social media, streaming, and healthcare.',
            '',
            'DigitalOnUs — DevOps / Cloud Migration',
            'Worked on datacenter-to-GCP migrations, using GitHub Actions as the main CI/CD platform and supporting migration work for hundreds of applications.',
            '',
            'Tacit Knowledge — DevOps / Infrastructure',
            'Supported eCommerce platforms for 15+ clients, working with Terraform, Jenkins, GitHub Actions, Kubernetes, Helm, and microservices infrastructure.',
            '',
            'Earlier experience:',
            'Built a strong foundation in Linux, systems administration, networking, firewalls, VPNs, databases, middleware, datacenter operations, and production support across IBM, HSBC, and later teaching work at ITESO.'
        ].join('\n'),
        'key achievements': [
            '- Led or supported migration initiatives involving 100+ applications from on-prem to cloud platforms',
            '- Built observability platforms for 30+ live applications',
            '- Designed secure infrastructure patterns supporting ISO 27001 certification goals',
            '- Supported high-stakes platforms across banking, retail, finance, healthcare, streaming, and enterprise environments',
            '- Led technical teams and coordinated infrastructure work across senior engineers and stakeholders'
        ].join('\n'),
        'education': [
            'Computer Systems / Engineering background.',
            'Continuous professional experience in Linux, cloud platforms, DevOps, security, networking, automation, and production infrastructure since early career.'
        ].join('\n')
    };

    var helpText = [
        'Interactive CV terminal',
        '',
        'Available commands:',
        '- summary',
        '- core skills',
        '- professional experience',
        '- key achievements',
        '- education',
        '- help',
        '- clear',
        '- exit'
    ].join('\n');

    function setMenu(open) {
        if (!menuToggle || !siteNav) {
            return;
        }
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        siteNav.classList.toggle('is-open', open);
    }

    function updateExperienceMode() {
        var isPhoneLike = mobileQuery.matches || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        body.classList.toggle('is-mobile-experience', isPhoneLike);
        if (!isPhoneLike) {
            setMenu(false);
        }
    }

    function createPromptNode() {
        var prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';

        var shell = document.createElement('span');
        shell.className = 'prompt-segment prompt-segment-shell';

        var logo = document.createElement('span');
        logo.className = 'prompt-logo';
        logo.setAttribute('aria-hidden', 'true');
        shell.appendChild(logo);

        prompt.appendChild(shell);

        var path = document.createElement('span');
        path.className = 'prompt-segment prompt-segment-path';
        path.textContent = '~/cv';
        prompt.appendChild(path);

        var glyph = document.createElement('span');
        glyph.className = 'prompt-glyph';
        glyph.setAttribute('aria-hidden', 'true');
        glyph.textContent = '›';
        prompt.appendChild(glyph);

        return prompt;
    }

    function scrollTerminalToPrompt() {
        if (!terminalScreen || !terminalForm) {
            return;
        }
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        if (typeof terminalForm.scrollIntoView === 'function') {
            terminalForm.scrollIntoView({ block: 'end' });
        }
    }

    function appendEntry(command, response, isError) {
        var entry = document.createElement('div');
        entry.className = 'terminal-entry';

        var commandLine = document.createElement('div');
        commandLine.className = 'terminal-command';

        commandLine.appendChild(createPromptNode());

        var commandText = document.createElement('span');
        commandText.className = 'terminal-command-text';
        commandText.textContent = command;
        commandLine.appendChild(commandText);

        entry.appendChild(commandLine);

        if (response) {
            var responseBlock = document.createElement('div');
            responseBlock.className = 'terminal-response' + (isError ? ' terminal-error' : '');
            responseBlock.textContent = response;
            entry.appendChild(responseBlock);
        }

        terminalOutput.appendChild(entry);
        scrollTerminalToPrompt();
    }

    function openTerminal() {
        lastFocus = document.activeElement;
        terminalModal.hidden = false;
        terminalModal.setAttribute('aria-hidden', 'false');
        body.classList.add('terminal-open');
        terminalInput.focus();
        if (!terminalOutput.textContent.trim()) {
            appendEntry('help', helpText);
        }
        scrollTerminalToPrompt();
    }

    function closeTerminal() {
        terminalModal.hidden = true;
        terminalModal.setAttribute('aria-hidden', 'true');
        body.classList.remove('terminal-open');
        terminalInput.value = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }

    function runCommand(rawValue) {
        var command = rawValue.trim().toLowerCase();
        if (!command) {
            return;
        }

        if (command === 'exit') {
            appendEntry(command, 'Closing terminal...');
            closeTerminal();
            return;
        }

        if (command === 'clear') {
            terminalOutput.innerHTML = '';
            scrollTerminalToPrompt();
            return;
        }

        if (command === 'help') {
            appendEntry(command, helpText);
            return;
        }

        if (commandMap[command]) {
            appendEntry(command, commandMap[command]);
            return;
        }

        appendEntry(command, 'Unknown command. Type "help" to see available commands.', true);
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            setMenu(!siteNav.classList.contains('is-open'));
        });
    }

    document.querySelectorAll('.site-nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            setMenu(false);
        });
    });

    if (terminalLaunch) {
        terminalLaunch.addEventListener('click', openTerminal);
    }

    closeControls.forEach(function (control) {
        control.addEventListener('click', closeTerminal);
    });

    if (terminalForm) {
        terminalForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var value = terminalInput.value;
            terminalInput.value = '';
            runCommand(value);
        });
    }

    updateExperienceMode();

    if (typeof mobileQuery.addEventListener === 'function') {
        mobileQuery.addEventListener('change', updateExperienceMode);
    } else if (typeof mobileQuery.addListener === 'function') {
        mobileQuery.addListener(updateExperienceMode);
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && terminalModal && !terminalModal.hidden) {
            closeTerminal();
        }
    });
})();
