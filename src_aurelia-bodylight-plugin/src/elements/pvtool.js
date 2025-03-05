import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-templating';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class Pvtool {
    @bindable fromid;
    @bindable rrid = 'idrate';
    @bindable refindex;
    @bindable refvalues;
    //@bindable rrid = 'breath_rate';
    isCursor1 = true;
    cursor1value = 0;
    cursor2value = 90;
    cursor1P = 5.2; cursor1Pstr = "--";
    cursor1V = 0; cursor1Vstr = "--";
    cursor2P = 35.0; cursor2Pstr = "--";
    cursor2V = 436; cursor2Vstr = "--";
    inflcompliance = 14.6; inflcompliance = "--";
    startedpvtool = false;

    constructor(ea) {
        this.ea = ea;
    }
    bind(){
        if (typeof this.refindex == "string") this.refindex = parseInt(this.refindex,10)
        if (typeof this.refvalues == "string") this.refvalues = parseInt(this.refvalues,10)
    }

    attached() {
        this.subscription1 = this.ea.subscribe('chartdata1', data => { this.cursor1data(data) })
        this.subscription2 = this.ea.subscribe('chartdata2', data => { this.cursor2data(data) })
    }
    detached() {
        this.subscription1.dispose();
        this.subscription2.dispose();
    }
    //@bindable 
    cursor1() {
        this.isCursor1 = true;
    }

    cursor2() {
        this.isCursor1 = false;
    }

    cursor1data(data) {
        console.log('cursor1 data received:', data)
        this.cursor1P = data.x;
        this.cursor1V = data.y;
        this.cursor1Pstr = this.cursor1P.toFixed(2)
        this.cursor1Vstr = this.cursor1V.toFixed(2)
        this.compliance()
    }
    cursor2data(data) {
        console.log('cursor2 data received:', data)
        this.cursor2P = data.x;
        this.cursor2V = data.y;
        this.cursor2Pstr = this.cursor2P.toFixed(2)
        this.cursor2Vstr = this.cursor2V.toFixed(2)
        this.compliance()
    }

    compliance() {
        this.inflcompliance = (this.cursor2V - this.cursor1V) / (this.cursor2P - this.cursor1P)
        this.inflcompliancestr = this.inflcompliance.toFixed(2)


    }

    decreaseCursor() {
        if (this.isCursor1) {
            if (this.cursor1value > 0) this.cursor1value--;
            this.ea.publish('chartcontrol', { type: 'refpoint1', data: this.cursor1value })
        } else {
            if (this.cursor2value > 0) this.cursor2value--;
            this.ea.publish('chartcontrol', { type: 'refpoint2', data: this.cursor2value })
        }
    }

    increaseCursor() {
        if (this.isCursor1) {
            this.cursor1value++;
            this.ea.publish('chartcontrol', { type: 'refpoint1', data: this.cursor1value })
        } else {
            this.cursor2value++;
            this.ea.publish('chartcontrol', { type: 'refpoint2', data: this.cursor2value })
        }
    }

    startstop() {
        if (!this.startedpvtool) {
            //start
            this.ea.publish('chartcontrol', { type: 'start', data: [0.01, 2.31] })
            this.setRR(3)
            //demo data
            this.senddata();
            /*this.ea.publish('chartcontrol',{type:'data',data:[760.01*133.322,0.00231]})
            this.ea.publish('chartcontrol',{type:'data',data:[765.01*133.322,0.00231]})
            this.ea.publish('chartcontrol',{type:'data',data:[771.09*133.322,0.00306]})
            this.ea.publish('chartcontrol',{type:'data',data:[765.09*133.322,0.00306]})*/
        } else {
            //stop
            this.setRR(17); //TODO set original RR
            //this.startedpvtool = false;
            // Stop after 20s
            clearInterval(this.timer);

            this.ea.publish('chartcontrol', { type: 'stop', data: [11.09, 3.065] })
        }
        this.startedpvtool = !this.startedpvtool
    }

    fireevent='input';    
    setRR(value){
        let inputel = document.getElementById(this.rrid);
        inputel.value = value;
        let event = new Event(this.fireevent);
        inputel.dispatchEvent(event);
    }

    senddata() {
        /////////////////////////////////////////////////////////////
        // Configuration
        /////////////////////////////////////////////////////////////
        const x0 = 101324, x1 = 104664, x2 = 101324;    // X: up, then down
        const y0 = 0.00231, y1 = 0.00306, y2 = 0.00250; // Y: up (sigmoid), then down (ease-in)

        const phase1Duration = 10000; // 0..10s //TODO back to 10000
        const phase2Duration = 10000; // 10..20s
        const totalDuration = phase1Duration + phase2Duration;

        const intervalMs = 100;   // Publish updates every 100 ms //TODO back to 100
        const startTime = Date.now();

        // Phase 1 logistic steepness
        const SIGMOID_STEEPNESS_PHASE1 = 6;

        // Phase 2 ease-in exponent
        //   >1 means slower at start, faster near the end
        const EASE_IN_EXPONENT_PHASE2 = 2;

        /////////////////////////////////////////////////////////////
        // Normalized logistic function:
        //   fraction in [0..1] => [0..1], with a sigmoid shape
        /////////////////////////////////////////////////////////////
        function normalizedLogistic(fraction, k) {
            // Standard logistic centered at 0.5
            const raw = 1 / (1 + Math.exp(-k * (fraction - 0.5)));

            // Evaluate at fraction=0 and fraction=1 for normalization
            const raw0 = 1 / (1 + Math.exp(-k * (0.0 - 0.5)));
            const raw1 = 1 / (1 + Math.exp(-k * (1.0 - 0.5)));

            const offset = raw0;
            const scale = raw1 - raw0;

            return (raw - offset) / scale;  // maps fraction=0..1 => 0..1 exactly
        }

        /////////////////////////////////////////////////////////////
        // "easeInPower" function for the descending phase:
        //   fraction in [0..1] => fraction^p,  p>1 => slower at start, faster at end
        /////////////////////////////////////////////////////////////
        function easeInPower(fraction, exponent) {
            // fraction=0 => 0; fraction=1 => 1
            // Slope near 0 is small; slope near 1 is large
            return Math.pow(fraction, exponent);
        }

        /////////////////////////////////////////////////////////////
        // Main loop
        /////////////////////////////////////////////////////////////
        this.timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= totalDuration) {
                this.setRR(17); //TODO set original RR
                this.startedpvtool = false;
                // Stop after 20s
                clearInterval(this.timer);
                this.timer=null;
                return;
            }

            let x, y;

            if (elapsed <= phase1Duration) {
                //////////////////////////////////////////
                // PHASE 1: 0..10s
                //////////////////////////////////////////
                const fraction1 = elapsed / phase1Duration; // in [0..1]

                // X: linear from x0 to x1
                x = x0 + fraction1 * (x1 - x0);

                // Y: logistic from y0 to y1
                const fracUp = normalizedLogistic(fraction1, SIGMOID_STEEPNESS_PHASE1);
                y = y0 + (y1 - y0) * fracUp;

            } else {
                //////////////////////////////////////////
                // PHASE 2: 10..20s
                //////////////////////////////////////////
                const t2 = elapsed - phase1Duration;   // time into Phase 2
                const fraction2 = t2 / phase2Duration; // in [0..1]

                // X: linear from x1 to x2
                x = x1 + fraction2 * (x2 - x1);

                // Y: "ease-in" from y1 down to y2
                //    => starts a bit slower than linear, ends faster
                const fracDown = easeInPower(fraction2, EASE_IN_EXPONENT_PHASE2);
                y = y1 + (y2 - y1) * fracDown;
            }

            //////////////////////////////////////////
            // Publish to your chart
            //////////////////////////////////////////
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

        }, intervalMs);

    }


    senddataLogistic4() {
        /////////////////////////////////////////////////////////////
        // Configuration
        /////////////////////////////////////////////////////////////
        const x0 = 101324, x1 = 103069, x2 = 101324;    // X: up, then down Pa
        const y0 = 0.00231, y1 = 0.00306, y2 = 0.00240; // Y: up (sigmoid), then down (sigmoid)

        // Durations (ms)
        const phase1Duration = 10000; // 0..10s
        const phase2Duration = 10000; // 10..20s
        const totalDuration = phase1Duration + phase2Duration;

        const intervalMs = 100;   // Publish updates every 100 ms
        const startTime = Date.now();

        // Different steepness in each phase
        const SIGMOID_STEEPNESS_PHASE1 = 5;
        const SIGMOID_STEEPNESS_PHASE2 = 6;

        /////////////////////////////////////////////////////////////
        // "normalizedLogistic(fraction, k)"
        //   Produces 0 at fraction=0 and 1 at fraction=1, with 
        //   a logistic shape in between. Steepness controlled by k.
        /////////////////////////////////////////////////////////////
        function normalizedLogistic(fraction, k) {
            // Standard logistic centered at 0.5:
            //   raw(f) = 1 / (1 + exp(-k*(f - 0.5)))
            //
            // But raw(0) != 0 and raw(1) != 1. So we rescale:
            const raw = 1 / (1 + Math.exp(-k * (fraction - 0.5)));

            const raw0 = 1 / (1 + Math.exp(-k * (0.0 - 0.5)));
            const raw1 = 1 / (1 + Math.exp(-k * (1.0 - 0.5)));

            // Map [raw0, raw1] -> [0, 1]
            const offset = raw0;
            const scale = raw1 - raw0;

            return (raw - offset) / scale;
        }

        /////////////////////////////////////////////////////////////
        // Main loop
        /////////////////////////////////////////////////////////////
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= totalDuration) {
                // All done after 20s
                clearInterval(timer);
                return;
            }

            let x, y;

            if (elapsed <= phase1Duration) {
                //////////////////////////////////////////
                // PHASE 1: 0..10s
                //////////////////////////////////////////
                const fraction1 = elapsed / phase1Duration; // in [0..1]

                // X: linear from x0 to x1
                x = x0 + fraction1 * (x1 - x0);

                // Y: sigmoid from y0 to y1, using steepness=4
                const fracUp = normalizedLogistic(fraction1, SIGMOID_STEEPNESS_PHASE1);
                y = y0 + (y1 - y0) * fracUp;

            } else {
                //////////////////////////////////////////
                // PHASE 2: 10..20s
                //////////////////////////////////////////
                const t2 = elapsed - phase1Duration;      // time into Phase 2
                const fraction2 = t2 / phase2Duration;    // in [0..1]

                // X: linear from x1 to x2
                x = x1 + fraction2 * (x2 - x1);

                // Y: sigmoid from y1 to y2, using steepness=5
                const fracDown = normalizedLogistic(fraction2, SIGMOID_STEEPNESS_PHASE2);
                y = y1 + (y2 - y1) * fracDown;
            }

            //////////////////////////////////////////
            // Publish to your chart
            //////////////////////////////////////////
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

        }, intervalMs);

    }
    senddataSigmoid3() {
        /////////////////////////////////////////////////////////////
        // Configuration
        /////////////////////////////////////////////////////////////
        const x0 = 101324, x1 = 103069, x2 = 101324;    // X: up, then down
        const y0 = 0.00231, y1 = 0.00306, y2 = 0.00250; // Y: up (sigmoid), then down (sigmoid)

        // Durations (ms)
        const phase1Duration = 10000; // 0..10s
        const phase2Duration = 10000; // 10..20s
        const totalDuration = phase1Duration + phase2Duration;

        const intervalMs = 100;   // Publish updates every 100 ms
        const startTime = Date.now();

        // Steepness for the logistic shape (3 is milder, 8 or 10 is steeper)
        const SIGMOID_STEEPNESS = 4;

        /////////////////////////////////////////////////////////////
        // A "normalized" logistic function so that:
        //   normalizedLogistic(0, k) == 0
        //   normalizedLogistic(1, k) == 1
        // and the shape in between is sigmoid with "steepness" k.
        //
        // This ensures we hit the start and end values EXACTLY when fraction=0 or 1.
        /////////////////////////////////////////////////////////////
        function normalizedLogistic(fraction, k) {
            // Standard logistic centered at 0.5:
            //   raw(f) = 1 / (1 + exp(-k*(f - 0.5)))
            //
            // But raw(0) != 0 and raw(1) != 1. So we map [ raw(0), raw(1) ] to [0, 1]:
            const raw = 1 / (1 + Math.exp(-k * (fraction - 0.5)));

            const raw0 = 1 / (1 + Math.exp(-k * (0.0 - 0.5))); // logistic at f=0
            const raw1 = 1 / (1 + Math.exp(-k * (1.0 - 0.5))); // logistic at f=1

            const offset = raw0;      // what logistic is at fraction=0
            const scale = raw1 - raw0; // difference from fraction=0 to fraction=1

            // Normalize so fraction=0 -> 0, fraction=1 -> 1:
            return (raw - offset) / scale;
        }

        /////////////////////////////////////////////////////////////
        // Main loop
        /////////////////////////////////////////////////////////////
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= totalDuration) {
                // All done after 20s
                clearInterval(timer);
                return;
            }

            let x, y;

            if (elapsed <= phase1Duration) {
                //////////////////////////////////////////
                // PHASE 1: 0..10s
                //////////////////////////////////////////
                const fraction1 = elapsed / phase1Duration; // in [0..1]

                // X: linear from x0 to x1
                x = x0 + fraction1 * (x1 - x0);

                // Y: sigmoid from y0 to y1 (EXACTLY y0 at start, y1 at end)
                const fracUp = normalizedLogistic(fraction1, SIGMOID_STEEPNESS);
                y = y0 + (y1 - y0) * fracUp;

            } else {
                //////////////////////////////////////////
                // PHASE 2: 10..20s
                //////////////////////////////////////////
                const t2 = elapsed - phase1Duration;      // time into Phase 2
                const fraction2 = t2 / phase2Duration;    // in [0..1]

                // X: linear from x1 to x2
                x = x1 + fraction2 * (x2 - x1);

                // Y: sigmoid from y1 to y2
                //   -> "descending" S-curve if y2 < y1
                //   -> EXACTLY y1 at fraction2=0, EXACTLY y2 at fraction2=1
                const fracDown = normalizedLogistic(fraction2, SIGMOID_STEEPNESS);
                y = y1 + (y2 - y1) * fracDown;
            }

            //////////////////////////////////////////
            // Publish to your chart
            //////////////////////////////////////////
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

        }, intervalMs);

    }
    senddataSigmoid2() {
        /////////////////////////////////////////////////////////////
        // Configuration
        /////////////////////////////////////////////////////////////
        const x0 = 101324, x1 = 103069, x2 = 101324;   // X: up, then down
        const y0 = 0.00231, y1 = 0.00306, y2 = 0.00250; // Y: up (sigmoid), then down (sigmoid)

        // Durations (ms)
        const phase1Duration = 10000; // 0..10s
        const phase2Duration = 10000; // 10..20s
        const totalDuration = phase1Duration + phase2Duration;

        const intervalMs = 100;   // Publish updates every 100 ms
        const startTime = Date.now();

        // How "steep" the logistic curve is around its midpoint.
        // Larger => steeper, faster transition near the middle.
        const SIGMOID_STEEPNESS = 3;

        /////////////////////////////////////////////////////////////
        // Logistic (sigmoid) helper for "going up" from ~0 to ~1
        //   logisticUp(0)  ~ 0
        //   logisticUp(1)  ~ 1
        //   Symmetric about fraction=0.5
        /////////////////////////////////////////////////////////////
        function logisticUp(fraction) {
            // For fraction in [0..1], the exponent goes from -k to +k.
            // That makes logisticUp(0) ~ 0.0003 (very close to 0) 
            // and logisticUp(1) ~ 0.9997 (very close to 1), for k=8.
            return 1 / (1 + Math.exp(-SIGMOID_STEEPNESS * (2 * fraction - 1)));
        }

        /////////////////////////////////////////////////////////////
        // Main loop
        /////////////////////////////////////////////////////////////
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= totalDuration) {
                // All done after 20s
                clearInterval(timer);
                return;
            }

            let x, y;

            if (elapsed <= phase1Duration) {
                //////////////////////////////////////////
                // PHASE 1: 0..10s
                //////////////////////////////////////////
                const fraction1 = elapsed / phase1Duration; // in [0..1]

                // X: linear from x0 to x1
                x = x0 + fraction1 * (x1 - x0);

                // Y: sigmoid from y0 to y1
                //     y = y0 + (y1 - y0)*logisticUp(fraction1)
                const fracUp = logisticUp(fraction1);
                y = y0 + (y1 - y0) * fracUp;

            } else {
                //////////////////////////////////////////
                // PHASE 2: 10..20s
                //////////////////////////////////////////
                const t2 = elapsed - phase1Duration;       // time into Phase 2
                const fraction2 = t2 / phase2Duration;     // in [0..1]

                // X: linear from x1 down to x2
                x = x1 + fraction2 * (x2 - x1);

                // Y: sigmoid from y1 down to y2
                //     y = y1 + (y2 - y1)*logisticUp(fraction2)
                //
                // Note: (y2 - y1) is negative, so logisticUp(fraction2)
                // naturally produces a downward S-curve.
                const fracDown = logisticUp(fraction2);
                y = y1 + (y2 - y1) * fracDown;
            }

            //////////////////////////////////////////
            // Publish to your chart
            //////////////////////////////////////////
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

        }, intervalMs);

    }

    senddataLogistic1() {
        // --- Configuration ---
        const x0 = 101324, x1 = 103069, x2 = 101324;   // X positions (phase 1 → phase 2)
        const y0 = 0.00231, y1 = 0.00306, y2 = 0.00250; // Y positions (phase 1 → phase 2)

        const phase1Duration = 10000; // 10 seconds
        const phase2Duration = 10000; // 10 seconds
        const totalDuration = phase1Duration + phase2Duration;

        const intervalMs = 100;       // Update every 100 ms
        const startTime = Date.now(); // Reference start time

        // Controls the steepness of the logistic curve around its midpoint.
        const SIGMOID_STEEPNESS = 4;

        // A helper function to map fraction in [0..1] to a logistic fraction in [0..1].
        // The value is near 0 at fraction=0, rises fastest near fraction=0.5, near 1 at fraction=1.
        function logisticFrac(fraction) {
            return 1 / (1 + Math.exp(-SIGMOID_STEEPNESS * (fraction - 0.5)));
        }

        // Main loop
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed >= totalDuration) {
                // Time’s up: stop publishing
                clearInterval(timer);
                return;
            }

            let x, y;

            if (elapsed <= phase1Duration) {
                // --- PHASE 1: 0..10s ---
                // fraction1 goes from 0..1 over the first 10s
                const fraction1 = elapsed / phase1Duration;

                // x linearly from x0 to x1
                x = x0 + fraction1 * (x1 - x0);

                // y via logistic from y0 to y1
                const lf = logisticFrac(fraction1);
                y = y0 + (y1 - y0) * lf;

            } else {
                // --- PHASE 2: 10..20s ---
                const t2 = elapsed - phase1Duration;
                const fraction2 = t2 / phase2Duration; // goes from 0..1 over the second 10s

                // x linearly from x1 down to x2
                x = x1 + fraction2 * (x2 - x1);

                // y via logistic from y1 down to y2
                const lf2 = logisticFrac(fraction2);
                y = y1 + (y2 - y1) * lf2;
            }

            // Publish data to chartcontrol
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

        }, intervalMs);

    }

    senddataSigmoid() {
        // Define start and end points:
        const x0 = 101324, x1 = 103069;
        const y0 = 0.00231, y1 = 0.00306;

        // Total duration in milliseconds (10 seconds):
        const duration = 10000;
        const startTime = Date.now();  // Record start time

        // Update interval (100 ms):
        const intervalMs = 100;

        // This factor controls how steep the sigmoid is around its midpoint.
        const SIGMOID_STEEPNESS = 4; // Increase for a steeper/faster middle transition.

        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            // Fraction of the total time that has elapsed (range: 0 to 1)
            let fraction = elapsed / duration;
            if (fraction > 1) fraction = 1;

            // x grows linearly:
            const x = x0 + fraction * (x1 - x0);

            // y grows along a logistic (sigmoid) curve:
            //   logisticFraction = 1 / (1 + e^(-k * (fraction - 0.5)))
            // This is ~0 at fraction=0 and ~1 at fraction=1, with fastest growth near fraction=0.5
            const logisticFraction = 1 / (1 + Math.exp(-SIGMOID_STEEPNESS * (fraction - 0.5)));
            const y = y0 + (y1 - y0) * logisticFraction;

            // Publish data to chartcontrol:
            // leading zeros
            const leadingZeros = new Array(refindex).fill(0);            
            //return [...leadingZeros, ...data];
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [...leadingZeros,...[x, y]], // concatenation of leading zeros and original data.
            });

            // Stop once we've reached 10 seconds:
            if (fraction >= 1) {
                clearInterval(timer);
            }
        }, intervalMs);
    }


    senddatalinear() {
        // Define start and end points:
        const x0 = 101324, x1 = 103069;
        const y0 = 0.00231, y1 = 0.00306;

        // Total duration in milliseconds (10 seconds):
        const duration = 10000;
        const startTime = Date.now();  // Record start time

        // Update interval (100 ms):
        const intervalMs = 100;

        // Use setInterval to update at regular intervals:
        const timer = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTime;

            // Fraction of the total time that has elapsed:
            let fraction = elapsed / duration;
            if (fraction > 1) fraction = 1;

            // Linear interpolation for x and y:
            const x = x0 + fraction * (x1 - x0);
            const y = y0 + fraction * (y1 - y0);

            // "Publish" data to chartcontrol:
            this.ea.publish('chartcontrol', {
                type: 'data',
                data: [x, y],
            });

            // Once we've reached or exceeded the 10-second mark, clear the interval
            if (fraction >= 1) {
                clearInterval(timer);
            }
        }, intervalMs);

    }
}