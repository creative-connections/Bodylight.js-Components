set -x
# build plugin
rm -rf dist/
mkdir dist
au build-plugin
cp -TRv dist/ ../node_modules/aurelia-bodylight-plugin/dist/
cp -TRv src/ ../node_modules/aurelia-bodylight-plugin/src/
# build components
cd ..
#npm run build
# dev bundle rename as debug.js to scenarios
npm run build --dev
cp dist/bodylight.bundle.js ../Bodylight-Scenarios/bodylight.bundle.debug.js
cp dist/bodylight.bundle.js ../vito-visuals/dist/bodylight.bundle.debug.js
# production bundle copy as is to scenarios
npm run build
cp -TRv dist/ ../Bodylight-Scenarios/
cp -TRv dist/ ../vito-visuals/dist/
pwd
#au build
cd src_aurelia-bodylight-plugin/
cp -TRv ../dist/ ../../Bodylight-Editor/node_modules/bodylight-components/dist/
cp -TRv ../dist/ ../../Bodylight.js-Components/src_aucomponents/docs/scripts/
cp -TRv dist/ ../../Bodylight-Editor/node_modules/aurelia-bodylight-plugin/dist/
cp -TRv dist/ ../../bodylight-notebook/node_modules/aurelia-bodylight-plugin/dist/
cp -TRv ../dist/ ../../VR/breathing/
cp ../../Bodylight-Scenarios/bodylight.bundle.debug.js ../../VR/breathing/
# build editor
cd ../../Bodylight-Editor
au build
cd ../Bodylight.js-Components/src_aurelia-bodylight-plugin/

