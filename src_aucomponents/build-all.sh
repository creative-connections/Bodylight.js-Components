# build plugin
rm -rf dist/
mkdir dist
au build-plugin
cp -TRv dist/ ../Bodylight.js-Components/node_modules/aurelia-bodylight-plugin/dist/
# build components
cd ../Bodylight.js-Components/
#npm run build
# dev bundle rename as debug.js to scenarios
npm run build:dev
cp dist/bodylight.bundle.js ../Bodylight-Scenarios/bodylight.bundle.debug.js
# production bundle copy as is to scenarios
npm run build
cp -TRv dist/ ../Bodylight-Scenarios/
#au build
cd ../Bodylight.js-Components/src_aucomponents/
cp -TRv ../Bodylight.js-Components/dist/ ../Bodylight-Editor/node_modules/bodylight-components/dist/
cp -TRv ../Bodylight.js-Components/dist/ ../Bodylight.js-Components/src_aucomponents/docs/scripts/
cp -TRv dist/ ../Bodylight-Editor/node_modules/aurelia-bodylight-plugin/dist/
cp -TRv dist/ ../bodylight-notebook/node_modules/aurelia-bodylight-plugin/dist/
cp -TRv ../Bodylight.js-Components/dist/ ../VR/breathing/
cp ../Bodylight-Scenarios/bodylight.bundle.debug.js ../VR/breathing/
# build editor
cd ../Bodylight-Editor
au build
cd ../Bodylight.js-Components/src_aucomponents/

