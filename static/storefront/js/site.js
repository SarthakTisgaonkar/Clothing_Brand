const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll("[data-tilt-card]");
const lookViewerRoot = document.querySelector("[data-look-viewer]");
const lookButtons = document.querySelectorAll("[data-look-option]");
const lookPanels = document.querySelectorAll("[data-look-panel]");

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        tabPanels.forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.panel === target);
        });
    });
});

revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 420)}ms`;
});

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
        },
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

tiltCards.forEach((card) => {
    const resetCard = () => {
        card.style.transform = "";
    };

    card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (x - 0.5) * 10;
        const rotateX = (0.5 - y) * 10;

        card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", resetCard);
    card.addEventListener("pointerup", resetCard);
});

const setLookPanel = (lookId) => {
    lookButtons.forEach((button) => {
        const isActive = button.dataset.lookOption === lookId;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    lookPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.lookPanel === lookId);
    });
};

const initLookViewer = async () => {
    if (!lookViewerRoot) {
        return;
    }

    try {
        const THREE = await import("https://unpkg.com/three@0.165.0/build/three.module.js");
        const { OrbitControls } = await import("https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js");

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        lookViewerRoot.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x101314, 0.07);

        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 2.15, 8.5);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
        controls.minPolarAngle = 0.9;
        controls.maxPolarAngle = 1.82;
        controls.target.set(0, 1.8, 0);

        const ambient = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambient);

        const keyLight = new THREE.SpotLight(0xffb27d, 26, 28, Math.PI / 5, 0.4, 1.8);
        keyLight.position.set(-5, 8, 5);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight(0x26d5c2, 22, 26, 2);
        rimLight.position.set(4.5, 2, 5.5);
        scene.add(rimLight);

        const topLight = new THREE.DirectionalLight(0xf8f3e8, 1.1);
        topLight.position.set(0, 8, 3);
        scene.add(topLight);

        const floor = new THREE.Mesh(
            new THREE.CircleGeometry(3.9, 64),
            new THREE.MeshStandardMaterial({
                color: 0x111616,
                roughness: 0.88,
                metalness: 0.08,
                transparent: true,
                opacity: 0.82,
            }),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2.18;
        scene.add(floor);

        const floorRing = new THREE.Mesh(
            new THREE.RingGeometry(3.0, 3.55, 80),
            new THREE.MeshBasicMaterial({
                color: 0x14cabc,
                transparent: true,
                opacity: 0.36,
                side: THREE.DoubleSide,
            }),
        );
        floorRing.rotation.x = -Math.PI / 2;
        floorRing.position.y = -2.16;
        scene.add(floorRing);

        const viewerGroup = new THREE.Group();
        scene.add(viewerGroup);

        const skinMaterial = new THREE.MeshStandardMaterial({
            color: 0xd1b8a2,
            roughness: 0.72,
            metalness: 0.05,
        });
        const jacketMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xb96039,
            roughness: 0.32,
            metalness: 0.2,
            clearcoat: 0.26,
        });
        const innerMaterial = new THREE.MeshStandardMaterial({
            color: 0xf0e5da,
            roughness: 0.6,
            metalness: 0.02,
        });
        const pantsMaterial = new THREE.MeshStandardMaterial({
            color: 0x394044,
            roughness: 0.72,
            metalness: 0.08,
        });
        const shoesMaterial = new THREE.MeshStandardMaterial({
            color: 0xf6f2ee,
            roughness: 0.42,
            metalness: 0.08,
        });
        const accentMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x18d2c2,
            roughness: 0.18,
            metalness: 0.45,
            emissive: 0x0a2c29,
            emissiveIntensity: 0.4,
        });

        const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.16 });
        const shadowPlane = new THREE.Mesh(new THREE.CircleGeometry(2.35, 40), shadowMaterial);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -2.15;
        viewerGroup.add(shadowPlane);

        const model = new THREE.Group();
        viewerGroup.add(model);

        const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 32), skinMaterial);
        head.position.y = 3.15;
        model.add(head);

        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.28, 16), skinMaterial);
        neck.position.y = 2.68;
        model.add(neck);

        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.82, 2.25, 26), jacketMaterial);
        torso.position.y = 1.55;
        model.add(torso);

        const innerPanel = new THREE.Mesh(new THREE.BoxGeometry(0.66, 1.68, 0.62), innerMaterial);
        innerPanel.position.set(0, 1.45, 0.32);
        model.add(innerPanel);

        const collar = new THREE.Mesh(
            new THREE.TorusGeometry(0.56, 0.08, 12, 38, Math.PI),
            accentMaterial,
        );
        collar.position.set(0, 2.32, -0.08);
        collar.rotation.x = Math.PI / 1.8;
        model.add(collar);

        const belt = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.06, 12, 48), accentMaterial);
        belt.position.y = 0.42;
        belt.rotation.x = Math.PI / 2;
        model.add(belt);

        const strap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.55, 0.22), accentMaterial);
        strap.position.set(0.62, 1.1, 0.5);
        strap.rotation.z = -0.42;
        model.add(strap);

        const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.2, 1.12, 18), jacketMaterial);
        leftUpperArm.position.set(-1.02, 1.95, 0);
        leftUpperArm.rotation.z = 0.58;
        model.add(leftUpperArm);

        const rightUpperArm = leftUpperArm.clone();
        rightUpperArm.position.x = 1.02;
        rightUpperArm.rotation.z = -0.58;
        model.add(rightUpperArm);

        const leftForeArm = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 1.02, 18), innerMaterial);
        leftForeArm.position.set(-1.58, 1.1, 0.08);
        leftForeArm.rotation.z = 0.32;
        model.add(leftForeArm);

        const rightForeArm = leftForeArm.clone();
        rightForeArm.position.x = 1.58;
        rightForeArm.rotation.z = -0.32;
        model.add(rightForeArm);

        const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.16, 20, 20), skinMaterial);
        leftHand.position.set(-1.77, 0.56, 0.12);
        model.add(leftHand);

        const rightHand = leftHand.clone();
        rightHand.position.x = 1.77;
        model.add(rightHand);

        const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.27, 2.4, 18), pantsMaterial);
        leftLeg.position.set(-0.38, -0.88, 0);
        model.add(leftLeg);

        const rightLeg = leftLeg.clone();
        rightLeg.position.x = 0.38;
        model.add(rightLeg);

        const leftCuff = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.04, 10, 30), accentMaterial);
        leftCuff.position.set(-0.38, -2.03, 0);
        leftCuff.rotation.x = Math.PI / 2;
        model.add(leftCuff);

        const rightCuff = leftCuff.clone();
        rightCuff.position.x = 0.38;
        model.add(rightCuff);

        const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.24, 1.28), shoesMaterial);
        leftShoe.position.set(-0.38, -2.22, 0.22);
        model.add(leftShoe);

        const rightShoe = leftShoe.clone();
        rightShoe.position.x = 0.38;
        model.add(rightShoe);

        const leftSole = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.06, 1.34), accentMaterial);
        leftSole.position.set(-0.38, -2.33, 0.22);
        model.add(leftSole);

        const rightSole = leftSole.clone();
        rightSole.position.x = 0.38;
        model.add(rightSole);

        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 140;
        const positions = new Float32Array(particleCount * 3);

        for (let index = 0; index < particleCount; index += 1) {
            const stride = index * 3;
            positions[stride] = (Math.random() - 0.5) * 8.5;
            positions[stride + 1] = Math.random() * 7 - 1.8;
            positions[stride + 2] = (Math.random() - 0.5) * 6.5;
        }

        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const particles = new THREE.Points(
            particleGeometry,
            new THREE.PointsMaterial({
                color: 0xfff7f0,
                size: 0.05,
                transparent: true,
                opacity: 0.8,
            }),
        );
        scene.add(particles);

        const lookPresets = {
            mens: {
                jacket: 0xb96039,
                inner: 0xf0e5da,
                pants: 0x394044,
                shoes: 0xf6f2ee,
                accent: 0x18d2c2,
                torsoScale: [1, 1.02, 1],
                torsoY: 1.55,
                legScale: [1, 1, 1],
                cuffVisible: true,
                shoulderX: 1.02,
            },
            womens: {
                jacket: 0xc77ea0,
                inner: 0xfff1e8,
                pants: 0xcab89f,
                shoes: 0xffffff,
                accent: 0xff6b3d,
                torsoScale: [0.92, 0.82, 0.94],
                torsoY: 1.82,
                legScale: [1.06, 1.08, 1.06],
                cuffVisible: false,
                shoulderX: 0.96,
            },
            unisex: {
                jacket: 0x1c9e93,
                inner: 0x162122,
                pants: 0x9f7d58,
                shoes: 0xf4ede6,
                accent: 0xffe45e,
                torsoScale: [1.08, 1.08, 1.06],
                torsoY: 1.48,
                legScale: [1, 1.02, 1],
                cuffVisible: true,
                shoulderX: 1.08,
            },
        };

        const updateLook = (lookId) => {
            const preset = lookPresets[lookId] || lookPresets.mens;

            jacketMaterial.color.setHex(preset.jacket);
            innerMaterial.color.setHex(preset.inner);
            pantsMaterial.color.setHex(preset.pants);
            shoesMaterial.color.setHex(preset.shoes);
            accentMaterial.color.setHex(preset.accent);

            torso.scale.set(...preset.torsoScale);
            torso.position.y = preset.torsoY;
            innerPanel.scale.set(preset.torsoScale[0] * 0.92, preset.torsoScale[1], preset.torsoScale[2]);
            innerPanel.position.y = preset.torsoY - 0.1;
            belt.position.y = preset.torsoY - 1.12;
            strap.position.set(0.62 * preset.torsoScale[0], preset.torsoY - 0.45, 0.5);
            collar.position.y = preset.torsoY + 0.77;

            leftUpperArm.position.x = -preset.shoulderX;
            rightUpperArm.position.x = preset.shoulderX;
            leftForeArm.position.x = -(preset.shoulderX + 0.56);
            rightForeArm.position.x = preset.shoulderX + 0.56;
            leftHand.position.x = -(preset.shoulderX + 0.75);
            rightHand.position.x = preset.shoulderX + 0.75;

            leftLeg.scale.set(...preset.legScale);
            rightLeg.scale.set(...preset.legScale);
            leftShoe.scale.set(1, 1, preset.legScale[0]);
            rightShoe.scale.set(1, 1, preset.legScale[0]);
            leftSole.scale.set(1, 1, preset.legScale[0]);
            rightSole.scale.set(1, 1, preset.legScale[0]);
            leftCuff.visible = preset.cuffVisible;
            rightCuff.visible = preset.cuffVisible;

            setLookPanel(lookId);
        };

        lookButtons.forEach((button) => {
            button.addEventListener("click", () => {
                updateLook(button.dataset.lookOption);
            });
        });

        updateLook("mens");

        const resizeViewer = () => {
            const width = lookViewerRoot.clientWidth;
            const height = lookViewerRoot.clientHeight;
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        resizeViewer();

        const resizeObserver = new ResizeObserver(() => resizeViewer());
        resizeObserver.observe(lookViewerRoot);

        const clock = new THREE.Clock();

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            controls.update();

            viewerGroup.rotation.y = Math.sin(elapsed * 0.18) * 0.08;
            model.position.y = Math.sin(elapsed * 1.2) * 0.05;
            strap.rotation.z = -0.42 + Math.sin(elapsed * 1.4) * 0.035;
            particles.rotation.y = elapsed * 0.03;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();
    } catch (error) {
        console.error("3D look viewer failed to load", error);
        lookViewerRoot.innerHTML = "";
    }
};

initLookViewer();
