"use strict";

// The model of all features
const features = {
    drinksholder: false,
    led: false,
    propeller: false,
    shield: false,
    solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("start");
    // register toggle-clicks
    document.querySelectorAll(".option").forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    // Toggle feature in "model"
    features[feature] = !features[feature];

    const doesFeatureElementAlreadyExist = document.querySelector(`#selected ul li[data-feature=${feature}]`);
    console.log(doesFeatureElementAlreadyExist);

    // If feature is (now) turned on:
    if (features[feature]) {
        // feature added
        console.log(`Feature ${feature} is turned on!`);

        // - mark target as chosen (add class "chosen")
        target.classList.add("chosen");

        // - un-hide the feature-layer(s) in the #product-preview;
        // Get all feature elements (e.g. sun shield has 2 images)
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        // Show all images
        featureElements.forEach((featureElement) => {
            featureElement.classList.remove("hide");
        });

        if (doesFeatureElementAlreadyExist) {
            // doesFeatureElementAlreadyExist.offsetHeight;
            doesFeatureElementAlreadyExist.classList.add("animate-feature");
            doesFeatureElementAlreadyExist.removeEventListener("transitionend", elementTransitionEnd);
        } else {
            // - create featureElement and append to #selected ul
            const featureElement = createFeatureElement(feature);
            // Used so the transition is instant to the top
            // where we want it to begin with, so the animation starts
            // from the start
            featureElement.style.transition = "none";
            document.querySelector("#selected ul").append(featureElement);

            // - create FLIP-animation to animate featureElement from img in target, to
            //   its intended position. Do it with normal animation or transition class!
            // 1. first: find the start-position
            const start = target.getBoundingClientRect();
            // 2. last: find the end-position
            const end = featureElement.getBoundingClientRect();
            // 3. invert: translate the element to the start-position
            const diffX = start.x - end.x;
            const diffY = start.y - end.y;

            featureElement.style.setProperty("--diffX", diffX);
            featureElement.style.setProperty("--diffY", diffY);

            // featureElement.offsetHeight; // reflow layout - necessary for Firefox ...
            // 4. play: animate the element to translate(0,0)
            featureElement.offsetHeight; // reflow layout to position it at the feature button instantly
            // Make the transition smooth again
            featureElement.style.transition = "";
            // Then run the animation
            featureElement.classList.add("animate-feature");
        }
    } else {
        // Else - if the feature (became) turned off:
        // feature removed
        console.log(`Feature ${feature} is turned off!`);

        // - no longer mark target as chosen
        target.classList.remove("chosen");

        // - hide the feature-layer(s) in the #product-preview
        // Get all feature elements (e.g. sun shield has 2 images)
        const featureElements = document.querySelectorAll(`img[data-feature=${feature}]`);

        // Hide all images
        featureElements.forEach((featureElement) => {
            featureElement.classList.add("hide");
        });

        // - find the existing featureElement in #selected ul
        const featureElement = document.querySelector(`#selected ul li[data-feature=${feature}]`);

        // - create FLIP-animation to animate featureElement to img in target
        // featureElement.classList.remove("animate-feature-in");
        // featureElement.classList.add("animate-feature-out");
        featureElement.classList.remove("animate-feature");

        // - when animation is complete, remove featureElement from the DOM
        featureElement.addEventListener("transitionend", elementTransitionEnd);

        // TODO: More code
    }
}

function elementTransitionEnd() {
    this.remove();
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
    const li = document.createElement("li");
    li.dataset.feature = feature;

    const img = document.createElement("img");
    img.src = `images/feature_${feature}.png`;
    img.alt = capitalize(feature);

    li.append(img);

    return li;
}

function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
